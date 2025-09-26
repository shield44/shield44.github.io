// Type definitions
interface ClockConfig {
  use24Hour?: boolean;
  showSeconds?: boolean;
}



interface NavigationState {
  isMenuOpen: boolean;
}

// Main Application Class
class PortfolioApp {
  private clock: HTMLElement | null = null;
  private videoPlayer: HTMLVideoElement | null = null;
  private navState: NavigationState = { isMenuOpen: false };
  
  private readonly videoFiles: string[] = [
    "videos/anim.mp4",
    "videos/blenderanim.mp4",
    "videos/donut_animation.mp4",
    "videos/eg1.mp4",
    "videos/Fire.mp4",
    "videos/Graph.mp4",
    "videos/LetterByLetterWithSound.mp4",
    "videos/rac.mp4",
    "videos/RiemannExample.mp4",
    "videos/svg.mp4",
    "videos/Updaters.mp4",
    "videos/slope.mp4",
    "videos/ValueTrackers.mp4"
  ];
  
  private currentVideoIndex: number = 0;
  private clockConfig: ClockConfig = {
    use24Hour: false,
    showSeconds: true
  };

  constructor() {
    this.init();
  }

  private init(): void {
    document.addEventListener('DOMContentLoaded', () => {
      this.initializeClock();
      this.initializeVideoPlayer();
      this.setupEventListeners();
    });
  }

  private initializeClock(): void {
    this.clock = document.getElementById('neon-clock');
    if (!this.clock) {
      console.warn('Clock element not found');
      return;
    }

    this.updateClock();
    setInterval(() => this.updateClock(), 1000);
  }

  private updateClock(): void {
    if (!this.clock) return;
    
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    let timeString: string;
    
    if (this.clockConfig.use24Hour) {
      timeString = `${this.padZero(hours)}:${this.padZero(minutes)}`;
    } else {
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours || 12;
      timeString = `${this.padZero(hours)}:${this.padZero(minutes)}`;
      if (!this.clockConfig.use24Hour) {
        timeString += ` ${ampm}`;
      }
    }

    if (this.clockConfig.showSeconds) {
      const colonIndex = timeString.lastIndexOf(':');
      if (colonIndex !== -1) {
        timeString = timeString.substring(0, colonIndex + 1) + this.padZero(seconds) + timeString.substring(colonIndex + 1);
      } else {
        timeString = timeString.replace(' ', `:${this.padZero(seconds)} `);
      }
    }

    // Add animated colons
    timeString = timeString.replace(/:/g, '<span class="colon">:</span>');
    this.clock.innerHTML = timeString;
  }

  private padZero(num: number): string {
    return num < 10 ? `0${num}` : num.toString();
  }

  private initializeVideoPlayer(): void {
    this.videoPlayer = document.getElementById("videoPlayer") as HTMLVideoElement;
    if (!this.videoPlayer) {
      console.warn('Video player not found');
      return;
    }

    // Auto-play next video when current ends
    this.videoPlayer.addEventListener("ended", () => this.nextVideo());
    
    // Load first video
    this.loadVideo(0);
  }

  private loadVideo(index: number): void {
    if (!this.videoPlayer || index < 0 || index >= this.videoFiles.length) {
      console.error('Invalid video index or player not found');
      return;
    }

    this.currentVideoIndex = index;
    this.videoPlayer.innerHTML = `<source src="${this.videoFiles[this.currentVideoIndex]}" type="video/mp4">`;
    this.videoPlayer.load();
    
    // Only autoplay if user has interacted with the page
    this.videoPlayer.play().catch(error => {
      console.log('Autoplay prevented:', error);
    });
  }

  public nextVideo(): void {
    const nextIndex = (this.currentVideoIndex + 1) % this.videoFiles.length;
    this.loadVideo(nextIndex);
  }

  public prevVideo(): void {
    const prevIndex = (this.currentVideoIndex - 1 + this.videoFiles.length) % this.videoFiles.length;
    this.loadVideo(prevIndex);
  }

  public toggleMenu(): void {
    const navList = document.getElementById('navList');
    if (!navList) {
      console.warn('Navigation list not found');
      return;
    }

    navList.classList.toggle('show');
    this.navState.isMenuOpen = !this.navState.isMenuOpen;
  }

  private setupEventListeners(): void {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const href = (anchor as HTMLAnchorElement).getAttribute('href');
        if (href) {
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      const navList = document.getElementById('navList');
      const menuButton = document.querySelector('.menu-button');
      
      if (navList && menuButton && 
          !navList.contains(e.target as Node) && 
          !menuButton.contains(e.target as Node) && 
          this.navState.isMenuOpen) {
        this.toggleMenu();
      }
    });
  }
}

// Initialize the application
const app = new PortfolioApp();

// Expose methods to global scope for HTML onclick handlers (legacy support)
declare global {
  interface Window {
    toggleMenu: () => void;
    nextVideo: () => void;
    prevVideo: () => void;
  }
}

window.toggleMenu = () => app.toggleMenu();
window.nextVideo = () => app.nextVideo();
window.prevVideo = () => app.prevVideo();

