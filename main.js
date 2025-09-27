// Portfolio Application - TypeScript version
var PortfolioApp = /** @class */ (function () {
    function PortfolioApp() {
        this.navState = { isMenuOpen: false };
        this.videoFiles = [
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
        this.currentVideoIndex = 0;
        this.clockConfig = {
            use24Hour: false,
            showSeconds: true
        };
        this.clock = null;
        this.videoPlayer = null;
        this.init();
    }
    PortfolioApp.prototype.init = function () {
        var _this = this;
        document.addEventListener('DOMContentLoaded', function () {
            _this.initializeClock();
            _this.initializeVideoPlayer();
            _this.setupEventListeners();
        });
    };
    PortfolioApp.prototype.initializeClock = function () {
        var _this = this;
        this.clock = document.getElementById('neon-clock');
        if (!this.clock) {
            console.warn('Clock element not found');
            return;
        }
        this.updateClock();
        setInterval(function () { return _this.updateClock(); }, 1000);
    };
    PortfolioApp.prototype.updateClock = function () {
        if (!this.clock)
            return;
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
        var timeString;
        if (this.clockConfig.use24Hour) {
            timeString = "".concat(this.padZero(hours), ":").concat(this.padZero(minutes));
        }
        else {
            var ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours || 12;
            timeString = "".concat(this.padZero(hours), ":").concat(this.padZero(minutes));
            if (!this.clockConfig.use24Hour) {
                timeString += " ".concat(ampm);
            }
        }
        if (this.clockConfig.showSeconds) {
            var colonIndex = timeString.lastIndexOf(':');
            if (colonIndex !== -1) {
                timeString = timeString.substring(0, colonIndex + 1) + this.padZero(seconds) + timeString.substring(colonIndex + 1);
            }
            else {
                timeString = timeString.replace(' ', ":".concat(this.padZero(seconds), " "));
            }
        }
        // Add animated colons
        timeString = timeString.replace(/:/g, '<span class="colon">:</span>');
        this.clock.innerHTML = timeString;
    };
    PortfolioApp.prototype.padZero = function (num) {
        return num < 10 ? "0".concat(num) : num.toString();
    };
    PortfolioApp.prototype.initializeVideoPlayer = function () {
        var _this = this;
        this.videoPlayer = document.getElementById("videoPlayer");
        if (!this.videoPlayer) {
            console.warn('Video player not found');
            return;
        }
        // Auto-play next video when current ends
        this.videoPlayer.addEventListener("ended", function () { return _this.nextVideo(); });
        // Load first video
        this.loadVideo(0);
    };
    PortfolioApp.prototype.loadVideo = function (index) {
        if (!this.videoPlayer || index < 0 || index >= this.videoFiles.length) {
            console.error('Invalid video index or player not found');
            return;
        }
        this.currentVideoIndex = index;
        this.videoPlayer.innerHTML = "<source src=\"".concat(this.videoFiles[this.currentVideoIndex], "\" type=\"video/mp4\">");
        this.videoPlayer.load();
        // Only autoplay if user has interacted with the page
        this.videoPlayer.play().catch(function (error) {
            console.log('Autoplay prevented:', error);
        });
    };
    PortfolioApp.prototype.nextVideo = function () {
        var nextIndex = (this.currentVideoIndex + 1) % this.videoFiles.length;
        this.loadVideo(nextIndex);
    };
    PortfolioApp.prototype.prevVideo = function () {
        var prevIndex = (this.currentVideoIndex - 1 + this.videoFiles.length) % this.videoFiles.length;
        this.loadVideo(prevIndex);
    };
    PortfolioApp.prototype.toggleMenu = function () {
        var navList = document.getElementById('navList');
        if (!navList) {
            console.warn('Navigation list not found');
            return;
        }
        navList.classList.toggle('show');
        this.navState.isMenuOpen = !this.navState.isMenuOpen;
    };
    PortfolioApp.prototype.setupEventListeners = function () {
        var _this = this;
        // Smooth scrolling for navigation links
        document.querySelectorAll('nav a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                var href = anchor.getAttribute('href');
                if (href) {
                    var target = document.querySelector(href);
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
        document.addEventListener('click', function (e) {
            var navList = document.getElementById('navList');
            var menuButton = document.querySelector('.menu-button');
            if (navList && menuButton &&
                !navList.contains(e.target) &&
                !menuButton.contains(e.target) &&
                _this.navState.isMenuOpen) {
                _this.toggleMenu();
            }
        });
    };
    return PortfolioApp;
}());

// Initialize the application
var app = new PortfolioApp();

// Expose methods to global scope for HTML onclick handlers
function toggleMenu() {
    app.toggleMenu();
}

function nextVideo() {
    app.nextVideo();
}

function prevVideo() {
    app.prevVideo();
}

// Make functions available globally
window.toggleMenu = toggleMenu;
window.nextVideo = nextVideo;
window.prevVideo = prevVideo;