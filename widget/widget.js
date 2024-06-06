const widgetFrame = document.querySelector("#js-promo__widget");
let smallSizeWidgetFlag = true;

const TIMER = 2000; // время появления виджета в мс.

const showWidgetOnPageLoad = () => {
  setTimeout(() => {
    widgetFrame.classList.add("promo__widget");
    widgetFrame.insertAdjacentHTML(
      "afterbegin",
      `<video
              class="widget__video"
              autoplay
              loop
              playsinline=""
              muted
              src="/assets/SpongeBob.mp4"
              id="js-widget__video"
              ></video>
            <div 
                class="widget__button--close" id="js-widget-close" 
                aria-label="кнопка закрытия рекламного виджета">   
            </div>
    `
    );
    // в хроме бех muted не работает autoplay

    const widgetCloseButton = document.querySelector("#js-widget-close");
    const widgetVideo = document.querySelector("#js-widget__video");

    // логика появления - исчезновения виджета
    const toggleWidgetFrame = () => {
      if (smallSizeWidgetFlag) {
        widgetVideo.muted = false;
        widgetFrame.classList.toggle("promo__widget--fullsize");
        widgetCloseButton.style = "right: -25%";
        smallSizeWidgetFlag = false;
      } else {
        widgetVideo.muted = true;
        widgetFrame.classList.toggle("promo__widget--fullsize");
        widgetCloseButton.style = "right: 5%";
        smallSizeWidgetFlag = true;
      }
    };
    const closeWidgetFrame = () => {
      widgetVideo.muted = true;
      widgetVideo.pause();
      widgetVideo.currentTime = 0;
      widgetFrame.style.display = "none";

      //удаляем обработчки ghb размонтировании
      widgetFrame.removeEventListener("click", toggleWidgetFrame);
      widgetCloseButton.removeEventListener("click", closeWidgetFrame);
      document.removeEventListener("DOMContentLoaded", showWidgetOnPageLoad);
      widgetFrame?.remove();
    };

    // добавляем обработчки на фрейм и на кнопку закрытия
    widgetFrame.addEventListener("click", toggleWidgetFrame);
    widgetCloseButton.addEventListener("click", closeWidgetFrame);
  }, TIMER);
};

document.addEventListener("DOMContentLoaded", showWidgetOnPageLoad);
