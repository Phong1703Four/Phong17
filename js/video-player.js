const videoPlayer = {
    init() {
        this.video = document.getElementById('native-video');
        if(!this.video) return;
        
        this.tocItems = document.querySelectorAll('.toc-item');
        
        // Add click events to TOC items
        this.tocItems.forEach(item => {
            item.addEventListener('click', () => {
                const time = parseFloat(item.getAttribute('data-time'));
                this.jumpToTime(time);
            });
        });
        
        // Sync TOC with video time
        this.video.addEventListener('timeupdate', () => {
            this.syncTOC(this.video.currentTime);
        });
    },
    
    jumpToTime(seconds) {
        if(this.video) {
            this.video.currentTime = seconds;
            this.video.play();
        }
    },
    
    syncTOC(currentTime) {
        let activeIndex = -1;
        
        // Find the most recent TOC item that has been passed
        for(let i = 0; i < this.tocItems.length; i++) {
            let itemTime = parseFloat(this.tocItems[i].getAttribute('data-time'));
            if(currentTime >= itemTime - 1) { // 1 second buffer
                activeIndex = i;
            } else {
                break;
            }
        }
        
        // Update active class
        this.tocItems.forEach((item, i) => {
            if(i === activeIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
};

window.switchVideo = function(id) {
    document.getElementById('video-content-nang-luong').style.display = 'none';
    document.getElementById('video-content-ap-suat').style.display = 'none';
    
    document.getElementById('btn-nang-luong').className = 'btn btn-outline playlist-btn';
    document.getElementById('btn-ap-suat').className = 'btn btn-outline playlist-btn';
    
    document.getElementById('video-content-' + id).style.display = 'flex';
    document.getElementById('btn-' + id).className = 'btn btn-primary playlist-btn active';
    
    // Dừng video cũ nếu đang phát
    document.querySelectorAll('.native-video').forEach(vid => {
        if(!vid.paused) vid.pause();
    });
    
    // Xử lý iframe video dừng
    var iframe = document.querySelector('#video-content-ap-suat iframe');
    if (iframe) {
        var iframeSrc = iframe.src;
        iframe.src = iframeSrc; 
    }
    
    // Re-init videoPlayer for new video if it's native
    if (id === 'nang-luong') {
        videoPlayer.video = document.getElementById('video-1');
        videoPlayer.tocItems = document.querySelectorAll('#video-content-nang-luong .toc-item');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    videoPlayer.init();
});
