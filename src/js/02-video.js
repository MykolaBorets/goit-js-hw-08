import vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

console.log('New play');

const iframe = document.querySelector('iframe');
const player = new vimeo(iframe);

console.log('played the video!');

const saveTimeThrottled = throttle(currentTime => {
  localStorage.setItem('videoTime', currentTime);
}, 1000);

player.on('timeupdate', function (data) {
  const currentTime = data.seconds;
  saveTimeThrottled(currentTime);
});

document.addEventListener('DOMContentLoaded', function () {
  const savedTime = localStorage.getItem('videoTime');
  if (savedTime) {
    player.setCurrentTime(parseFloat(savedTime));
  }
});
