const menuToggle = document.getElementById("menuToggle")
const mobileMenu = document.getElementById("mobileMenu")
const closeMenu = document.getElementById("closeMenu")

menuToggle.addEventListener("click", () => {
    // desativado
})

closeMenu.addEventListener("click", () => {
    mobileMenu.classList.remove("active")
})


mobileMenu.addEventListener("click", (e) => {
    if (e.target === mobileMenu) {
        mobileMenu.classList.remove("active")
    }
})


const faqQuestions = document.querySelectorAll(".faq-question")

faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
        const faqItem = question.parentElement
        const isActive = faqItem.classList.contains("active")


        document.querySelectorAll(".faq-item").forEach((item) => {
            item.classList.remove("active")
        })


        if (!isActive) {
            faqItem.classList.add("active")
        }
    })
})


//const shareBtn = document.getElementById("shareBtn")
const toast = document.getElementById("toast")



function showToast() {
    toast.classList.add("show")
    setTimeout(() => {
        toast.classList.remove("show")
    }, 3000)
}




const buyButton = document.getElementById("buyButton")
const price_current = document.getElementById('price-current');

buyButton.addEventListener("click", () => {
    buyButton.style.transform = "scale(0.95)"
    setTimeout(() => {
        buyButton.style.transform = "scale(1)"
    }, 150)


    buyButton.textContent = "PROCESSANDO..."
    buyButton.disabled = true

setTimeout(() => {
    buyButton.textContent = "COMPRAR AGORA";
    buyButton.disabled = false;

    function getUrlParams() {
        const params = {};
        
        window.location.search.substring(1).split('&').forEach(part => {
            const [key, value] = part.split('=');
            if (key && value) {
                params[key] = decodeURIComponent(value);
            }
        });
        return params;
    }

    const currentUrlParams = getUrlParams();
    let paramsToPass = '';

    for (const key in currentUrlParams) {
        if (key.startsWith('utm_') || key === 'xcod') {
            paramsToPass += `&${key}=${currentUrlParams[key]}`;
        }
    }

    if (paramsToPass.length > 0) {
        paramsToPass = paramsToPass.substring(1);
    }

    let checkoutUrl = '';

    if (price_current.innerHTML === 'R$ 119,90') {
        checkoutUrl = 'https://pay.blitzzoficial.com/checkout?product=dc151f78-6b31-11f0-a3b6-46da4690ad53';
    }
    // NO LUGAR DESSE 89 Se coloca a url
    else if (price_current.innerHTML === 'R$ 89,90') {
        checkoutUrl = 'https://pay.blitzzoficial.com/checkout?product=8e7ed19a-6b31-11f0-a3b6-46da4690ad53';
    }

    if (checkoutUrl && paramsToPass) {
        const separator = checkoutUrl.includes('?') ? '&' : '?';
        window.location.href = `${checkoutUrl}${separator}${paramsToPass}`;
    } else if (checkoutUrl) {
        window.location.href = checkoutUrl;
    }

}, 500);

})




const reviewActions = document.querySelectorAll(".review-action")

reviewActions.forEach((action) => {
    action.addEventListener("click", () => {
        const isLike = action.classList.contains("like")
        const countSpan = action.querySelector("span:last-child")

        if (countSpan) {
            let count = Number.parseInt(countSpan.textContent)


            if (action.classList.contains("active")) {
                action.classList.remove("active")
                count--
            } else {
                action.classList.add("active")
                count++
            }

            countSpan.textContent = count
        }
    })
})


document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            })
        }
    })
})





const cartCount = 0
const cartCountElement = document.querySelector(".cart-count")

function updateCartCount() {
    cartCountElement.textContent = cartCount
    if (cartCount > 0) {
        cartCountElement.style.display = "flex"
    } else {
        cartCountElement.style.display = "none"
    }
}


updateCartCount()

const mainImage = document.getElementById("mainImage");
const mainVideo = document.getElementById("mainVideo");
const thumbnails = document.querySelectorAll(".thumbnail");
const mainMedia = document.getElementById("mainMedia");

thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", () => {
    const isVideo = thumbnail.dataset.video === "true";

    thumbnails.forEach((thumb) => thumb.classList.remove("active"));
    thumbnail.classList.add("active");

    if (isVideo) {
      mainImage.style.display = "none";
      mainVideo.style.display = "block";

      mainMedia.style.display = 'flex';
      mainMedia.style.alignItems = 'center'

    } else {
      mainVideo.style.display = "none";
      mainImage.src = thumbnail.getAttribute("data-image");
      mainImage.alt = thumbnail.querySelector("img").alt;
      mainImage.style.display = "block";
      mainMedia.style.display = 'block';

    }
  });
});


document.addEventListener("keydown", (e) => {
    const activeThumbnail = document.querySelector(".thumbnail.active")
    const thumbnailsArray = Array.from(thumbnails)
    const currentIndex = thumbnailsArray.indexOf(activeThumbnail)

    let nextIndex = currentIndex

    if (e.key === "ArrowLeft" && currentIndex > 0) {
        nextIndex = currentIndex - 1
    } else if (e.key === "ArrowRight" && currentIndex < thumbnails.length - 1) {
        nextIndex = currentIndex + 1
    }

    if (nextIndex !== currentIndex) {
        thumbnails[nextIndex].click()
    }
})


let touchStartX = 0
let touchEndX = 0

mainImage.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX
})

mainImage.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX
    handleSwipe()
})

function handleSwipe() {
    const swipeThreshold = 50
    const activeThumbnail = document.querySelector(".thumbnail.active")
    const thumbnailsArray = Array.from(thumbnails)
    const currentIndex = thumbnailsArray.indexOf(activeThumbnail)

    if (touchEndX < touchStartX - swipeThreshold && currentIndex < thumbnails.length - 1) {

        thumbnails[currentIndex + 1].click()
    }

    if (touchEndX > touchStartX + swipeThreshold && currentIndex > 0) {

        thumbnails[currentIndex - 1].click()
    }
}


mainImage.addEventListener("click", () => {
    const modal = document.createElement("div")
    modal.className = "image-modal"
    modal.innerHTML = `
        <div class="modal-backdrop">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <img src="${mainImage.src}" alt="${mainImage.alt}">
            </div>
        </div>
    `

    document.body.appendChild(modal)


    const closeModal = () => {
        modal.remove()
        document.body.style.overflow = "auto"
    }

    modal.querySelector(".modal-close").addEventListener("click", closeModal)
    modal.querySelector(".modal-backdrop").addEventListener("click", (e) => {
        if (e.target === e.currentTarget) closeModal()
    })

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal()
    })

    document.body.style.overflow = "hidden"
})

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
            observer.unobserve(entry.target)
        }
    })
}, observerOptions)

document.querySelectorAll(".review, .faq-item, .guarantee-item").forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
})

window.addEventListener("load", () => {
    setTimeout(() => {
        document.querySelectorAll(".fill").forEach((fill) => {
            fill.style.transition = "width 1s ease"
        })
    }, 500)
})


//NOTIFICAÇÃO MAN

const felipe = document.getElementById('felipe');
const diogo = document.getElementById('diogo');
const comment_box = document.getElementById('comment-box');
const username_box = document.getElementById('username-box');
const avatar_box = document.getElementById('avatar-box');
const timestamp = document.getElementById('timestamp');


if (localStorage.getItem('view_page')) {
    felipe.classList.remove('comment_none');
    diogo.classList.remove('comment_none');
} else {
    setTimeout(() => {
        timestamp.innerHTML = '10 SEGUNDOS'
        comment_box.classList.remove('comment_none');
        felipe.classList.remove('comment_none');

    }, 3000);

    setTimeout(() => {
        comment_box.classList.add('comment_none')
    }, 6000);


    setTimeout(() => {
        timestamp.innerHTML = 'Agora'
        username_box.innerHTML = 'Diogo';
        avatar_box.innerHTML = 'D'
        comment_box.classList.remove('comment_none')
        diogo.classList.remove('comment_none');

        setTimeout(() => {
            comment_box.classList.add('comment_none')
        }, 4000);

    }, 14000);
    localStorage.setItem('view_page', 'true');
}



const option1 = document.getElementById('option1');
const option2 = document.getElementById('option2');
const modelo = document.getElementById('modelo');
const price_old = document.getElementById('price-old');

const discount = document.getElementById('discount');
const valor_parcela = document.getElementById('valor-parcela');

option1.addEventListener('click', () => {
    price_old.innerHTML = 'R$ 285,90'
    price_current.innerHTML = 'R$ 89,90'
    discount.innerHTML = '69% OFF';
    valor_parcela.innerHTML = 'R$ 29,96'
    modelo.innerHTML = 'Modelo: PlayZone +1 Controle'
    option1.style.border = '1.5px solid #0086ff'
    option2.style.border = '1.5px solid black'

})

option2.addEventListener('click', () => {
    price_old.innerHTML = 'R$ 345,90'
    price_current.innerHTML = 'R$ 119,90'
    discount.innerHTML = '65% OFF'
    valor_parcela.innerHTML = 'R$ 39,96'
    modelo.innerHTML = 'Modelo: PlayZone +2 Controle'
    option2.style.border = '1.5px solid #0086ff'
    option1.style.border = '1.5px solid black'
})

const guarantee_item1 = document.getElementById('guarantee_item1')
const guarantee_item2 = document.getElementById('guarantee_item2')
const guarantee_item3 = document.getElementById('guarantee_item3')

guarantee_item3.style.display = 'none'

