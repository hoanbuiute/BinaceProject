window.addEventListener("load", () => {
  progressBar();
  initLoading();
  handleSlider();
  handleAnimation();
});
// ---------------------------LOADING-------------------------
const initLoading = () => {
  let loadedCount = 0,
    imgs = document.querySelectorAll("img").length,
    container = document.querySelector("body");
  // element
  imagesLoaded(container)
    .on("progress", (instance) => {
      console.log(instance);
      loadedCount++;
      percent = Math.floor((loadedCount / imgs) * 100);
      // console.log(percent)
      handleLoading(percent);
    })
    .on("always", (instance) => {
      console.log("always");
    })
    .on("fail", (instance) => {
      console.log("fail");
    })
    .on("done", (instance) => {
      console.log("done");
      hideLoanding();
    });
  ////funtion loading
  const handleLoading = (percent) => {
    const progress = document.querySelector(".loading__bar-inner"),
      textPercent = document.querySelector(".loading__bar-number");
    progress.style.width = `${percent}%`;
    textPercent.innerHTML = `${percent}%`;
  };
  // funtion hide loanding
  const hideLoanding = () => {
    const loading = document.querySelector(".loading");
    body = document.querySelector("body");
    loading.classList.add("--hide");
    body.classList.remove("--disable-scroll");
  };
};
// ---------------------------SCROLL BACK TO TOP-------------------------
function scrollHandle() {
  const header = document.querySelector(".header"),
    btnBacktoTop = document.querySelector(".btnbacktoptop");
  function toggleBacktotop() {
    let scrollToy = window.scrollY,
      // console.log(window.innerHeight)
      heightHalf = document.body.offsetHeight / 2 - window.innerHeight;
    if (scrollToy > heightHalf) {
      btnBacktoTop.classList.add("--show");
    } else {
      btnBacktoTop.classList.remove("--show");
    }
  }
  window.addEventListener("scroll", function () {
    toggleBacktotop();
    changeBackGround();
  });
  ///sự kiện click backtoptop
  btnBacktoTop.addEventListener("click", function () {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  });
}
scrollHandle();
function changeBackGround() {
  const header = document.querySelector(".header");
  //  hero = document.querySelector(".schero")
  let scrollToy = window.scrollY; //lấy tọa độ khi scroll
  //nếu khi scroll đến chiều cao của hero thì thực hiện thêm classs
  if (scrollToy > 300) {
    header.classList.add("--change__background");
  } else {
    header.classList.remove("--change__background");
  }
}
// ---------------------------PROGRESSBAR--------------------------
const progressBar = () => {
  const scrollProgressBar = document.querySelector(".progressbar");
  // sự kiện scroll
  window.addEventListener("scroll", () => {
    let scrollHeight = window.scrollY,
      //  lấy % của đoạn croll đi được(chiều cao body phải trừ đi chiều cao màn hình vì croll lấy top của screen)
      percent =
        (scrollHeight / (document.body.offsetHeight - window.innerHeight)) *
        100;
    //   console.log(percent)
    scrollProgressBar.style.width = `${percent}%`;
  });
};
// ----------------------------------SLIDER USER-----------------------------/////
const handleSlider = () => {
  var slider = document.querySelector(
    ".home__main .scusersay .scusersay__slider"
  );
  if (slider) {
    var flktySlider = new Flickity(slider, {
      ////option
      contain: true,
      draggable: ">1",
      groupCells: 2,
      prevNextButtons: false,
      wrapAround: true,
      pageDots: true,
      // autoPlay:1500
      on: {
        ready: function () {
          console.log("flickity on ready");
          heightMax();
          // HandlePageDots();
        },
        change: function (index) {
          console.log("slide change to" + index);
          // handleNumberPage(index);
        },
      },
    });
    // ----------------------------------SLIDER USER REPONSIVE-----------------------------/////
    const flktyreponsive = new FlickityResponsive(slider, {
      contain: true,
      draggable: ">1",
      groupCells: 2,
      prevNextButtons: false,
      wrapAround: true,
      // fade: true,
      pageDots: true,

      responsive: [
        {
          breakpoint: 1199.98,
          settings: {
            groupCells: 1,
          },
        },
      ],
    });
  }
  function heightMax() {
    // ----------------------------------LOC CHIEU CAO-----------------------------/////
    let sliderItem = document.querySelectorAll(
      ".home__main .scusersay .scusersay__slider .scusersay__slider-item"
    );
    // let descItem = document.querySelectorAll(".scusersay__slider .scusersay__slider-item .textbox .desc");
    let max = 0;
    sliderItem.forEach((item) => {
      // // console.log(item);
      let descItem = item.querySelector(
        ".home__main .scusersay .scusersay__slider .scusersay__slider-item .textbox .desc"
      );
      let heightDesc = descItem.offsetHeight;
      if (heightDesc > max) {
        max = heightDesc;
      }
      descItem.style.height = `${max}px`;
    });
  }
};
// ------------------------------------CLICK WATCH VIDEO ----------------------------------
const clickWatchVideo = () => {
  const btnWatch = document.querySelector(
    ".home__main .scvideo__thumb .scvideo__thumb-icons"
  ),
    modalVideo = document.querySelector(".popupvideo"),
    btnClose = document.querySelector(
      ".popupvideo .popupvideo__inner .popupvideo__inner-iframe .btn__close"
    ),
    iframeModalVideo = document.querySelector(
      ".popupvideo .popupvideo__inner .popupvideo__inner-iframe iframe"
    );
  if (btnWatch) {
    btnWatch.addEventListener("click", (e) => {
      e.stopPropagation();
      modalVideo.classList.add("--active");
      // dataid = ``
      iframeModalVideo.setAttribute(
        "src",
        `https://www.youtube.com/embed/h7cOOfpdEfk?autoplay=1`
      );
    });
    btnClose.addEventListener("click", (e) => {
      e.stopPropagation();
      modalVideo.classList.remove("--active");
      iframeModalVideo.setAttribute("src", ``);
    });
    document.addEventListener("click", () => {
      modalVideo.classList.remove("--active");
      iframeModalVideo.setAttribute("src", ``);
    });
  }
};
clickWatchVideo();
// ---------------------------MODAL MENU MOBILE-------------------------
const mobileMenuHandle = () => {
  const menuItem = document.querySelector(
    ".header .header__right .header__right-btnmenu"
  );
  const scrollProgressBar = document.querySelector(".progressbar");
  const modalMenu = document.querySelector(".nav");
  const body = document.querySelector("body"),
    header = document.querySelector(".header");

  //sự kiện click nút menu nu
  menuItem.addEventListener("click", function () {
    modalMenu.classList.toggle("--show");
    menuItem.classList.toggle("--close");
    header.classList.remove("--change__background");
    body.classList.toggle("--disable-scroll");
    scrollProgressBar.classList.toggle("--hide");
  });

  ///remove Show
  const hideShowMenu = () => {
    modalMenu.classList.remove("--show");
    menuItem.classList.remove("--close");
    body.classList.remove("--disable-scroll");
    header.classList.remove("--change__background");
    scrollProgressBar.classList.remove("--hide");
  };
  // console.log(hideShow())
  //resize window

  window.addEventListener("resize", function () {
    let wWindow = window.innerWidth;
    if (wWindow > 992) {
      hideShowMenu();
    }
  });
};
mobileMenuHandle();

/////////////--------- Accordion------------///////////
const accordionHandle = () => {
  const acc = document.querySelectorAll(
    ".scaccordion__inner .scaccordion__inner-item .header "
  );
  if (acc) {
    acc.forEach((item, index) => {
      item.addEventListener("click", () => {
        item.classList.toggle("--active");
        let panel = item.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
        removeOpenedContent(index);
      });
    });
    ///Hàm remove vị trí index
    const removeOpenedContent = (index) => {
      acc.forEach((itemNew, indexNew) => {
        let panelNew = itemNew.nextElementSibling;
        if (index !== indexNew) {
          panelNew.style.maxHeight = null;
          itemNew.classList.remove("--active");
        }
      });
    };
  }
};
accordionHandle();
////////////////////////////------------------TAB BLOG------------------/////////////////////////////////////
const tabHandle = () => {
  let tabItem = document.querySelectorAll(".posts__tab .posts__tab-wrap .item"),
    postWrapItem = document.querySelectorAll(".posts__wrap .posts__wrap-item");
  if (tabItem) {
    tabItem.forEach((item, index) => {
      item.addEventListener("click", () => {
        tabItem.forEach((item) => {
          item.classList.remove("--active");
          postWrapItem.forEach((list) => {
            list.classList.remove("--active");
          });
        });
        item.classList.add("--active");
        document
          .querySelector(`.posts__wrap .item-${index}`)
          .classList.add("--active");
      });
    });
  }
};
tabHandle();
/////////////--------- VALIDATE FORM------------///////////
const validateForm = () => {
  const form = document.querySelector(".getintouch__form .form"),
    fullname = document.querySelector("#fullname"),
    company = document.querySelector("#namecompany"),
    email = document.querySelector("#email"),
    subject = document.querySelector("#subject"),
    mess = document.querySelector("#messenger")
  // confirm = document.querySelector("#")
  //Is Email
  function isEmail(value) {
    let regEmail = /\S+@\S+\.\S+/;
    return regEmail.test(value)
  }
  //Hiện Lỗi
  function handleError(el, textErr = '') {
    let error = el.parentElement.querySelector(".error");

    if (textErr != "") {
      error.innerText = textErr;
      el.classList.add("--invalid");
    } else {
      error.innerText = "";
      el.classList.remove("--invalid");
    }
  }

  function checkInput() {
    //validate fulname
    const valueFullname = fullname.value.trim();

    if (valueFullname == "") {
      handleError(fullname, "Please fill in this field");
    } else {
      handleError(fullname);
    }

    //Validate company name
    const valuecompany = company.value.trim();
    if (valuecompany == "") {
      handleError(company, "Please fill in this field");
    } else {
      handleError(company);
    }

    ///Email

    const valueEmail = email.value.trim();
    if (valueEmail == "") {
      handleError(email, 'Please fill in this field');
    }
    else if (!isEmail(valueEmail)) {
      handleError(email, 'Invalid email address');
    }
    else {
      handleError(email);
    }

    ///subject
    const valuesubject = subject.value.trim();
    if (valuesubject == "") {
      handleError(subject, "Please fill in this field");
    } else {
      handleError(subject);
    }
    //Messenger
    const valuemess = mess.value.trim();
    if (valuemess == "") {
      handleError(mess, "Please fill in this field");
    } else {
      handleError(mess);
    }
  }
  //submit form
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      console.log(1);
      checkInput();
    });
  }
};
validateForm();
/////////////--------- SCROLL ANIMATE ------------///////////
function handleAnimation() {
  const animate = new WOW();
  animate.init()
}