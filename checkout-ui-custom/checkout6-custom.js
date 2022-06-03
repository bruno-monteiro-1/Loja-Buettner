/* Lidando com os Cupons */

const cupons = [
  { code: '1234567890A', description: 'Desconto de R$20' },
  { code: '1234567890B', description: 'Frete Fixo R$19,90' },
  { code: '1234567890C', description: 'Desconto de 5%' },
];

const handleInsertCupons = () => {
  const containerCupons = document.querySelector('.content-wrapper-body');

  containerCupons.insertAdjacentHTML(
    'beforeend',
    cupons.map(currentCupon => handleCreateCupon(currentCupon)),
  );

  handleSessionCupomInUsing();
};

const handleCreateCupon = (currentCupon, locked = true) => {
  const { code, description } = currentCupon;

  return locked
    ? `
      <div class="ticket" data-ticket="XXXXXXXXXXX">
        <div class="left-container">
          <h1>XXXXXXXXXXX</h1>
          <div class="bullet-icon"></div>
        </div>

        <ul class="filled-container">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>

        <div class="right-container">
          <div class="description">
            <span>${description}</span>
          </div>
          <div class="bullet-icon"></div>
        </div>
      </div>
    `
    : `
      <div class="ticket" data-ticket="${code}">
        <div class="left-container">
          <h1>${code}</h1>
          <div class="bullet-icon"></div>
        </div>

        <ul class="filled-container">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>

        <div class="right-container">
          <div class="description">
            <span>${description}</span>
          </div>
          <div class="bullet-icon"></div>
        </div>
      </div>
    `;
};

const handleUnlockedCupons = () => {
  const containerCupons = document.querySelector('.content-wrapper-body');
  const wrapperCupons = document.querySelector('.coupons-content-wrapper');

  containerCupons.innerHTML = '';

  containerCupons.insertAdjacentHTML(
    'beforeend',
    cupons.map(currentCupon => handleCreateCupon(currentCupon, false)),
  );

  wrapperCupons.style.opacity = 1;

  handleClickCupomCode();
};

setTimeout(() => {
  handleInsertCupons();
}, 1000);

/* Lidando com o Modal de Cupons */

const handleSubmittedFormCupom = () => {
  const formCupons = document.forms.formCupons;

  formCupons.addEventListener('submit', element => {
    element.preventDefault();

    const totalOrderPrice = handleTotalOrderPrice();

    const { email } = formCupons;

    if (totalOrderPrice >= 300) {
      handleFetchEmailCupom(email.value)
        .then(() => {
          setTimeout(() => {
            handleRemoveModal();
            handleUnlockedCupons();
            handleSessionCupomInUsing(email.value);
          }, 2000);
        })
        .catch(error =>
          Error(`
          Erro ao enviar o email: ${error.message}
          Caso esteja visualizando esta mensagem solicite ao suporte da loja para lhe auxiliar.
        `),
        );

      handleMessageCupom(
        'Email aceito, aguarde! Estamos carregando os cupons disponíveis...',
      );
      handleStateProgressFetch();
    } else {
      handleMessageCupom(
        'Os cupons só estão disponíveis em compras acima de R$ 300,00',
      );
    }
  });
};

const handleTotalOrderPrice = () => {
  const totalOrderPrice = document.querySelector('.Items .monetary').innerText;

  const priceReplaced = totalOrderPrice.replace('R$', '').replace('.', '');
  return parseFloat(priceReplaced);
};

const handleFetchEmailCupom = async clientEmail => {
  const response = await fetch('/api/dataentities/EM/documents', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: Math.floor(Math.random() * (100000000000000 - 0) + 0),
      Email: clientEmail,
    }),
  });

  const data = await response.json();

  return data;
};

const handleRemoveModal = () => {
  const modalContainer = document.querySelector('.coupons-modal-wrapper');

  modalContainer.style.opacity = 0;
  modalContainer.parentElement.remove();
};

const handleStateProgressFetch = () => {
  const containerCupomModal = document.querySelector('.coupons-modal-wrapper');
  const buttonCupomSubmit = document.querySelector(
    '.modal-wrapper-form button',
  );

  buttonCupomSubmit.classList.add('disabled');
  containerCupomModal.classList.add('progress');
};

const handleMessageCupom = message => {
  const messageContainer = document.querySelector('.message-wrapper');

  messageContainer.innerText = message;
};

const handleClickCupomCode = () => {
  let tickets = document.querySelectorAll('.ticket');
  tickets = [...tickets];

  tickets.forEach(children =>
    children.addEventListener('click', element => {
      const currentTicket = element.target.dataset.ticket;

      handleSetCupomToInput(currentTicket);
    }),
  );
};

const handleSetCupomToInput = codeCupom => {
  const inputCupom = document.querySelector(
    '.cart-totalizers .coupon-fields #cart-coupon',
  );

  inputCupom.value = codeCupom;
  inputCupom.scrollIntoView({ block: 'start', behavior: 'smooth' });
};

const handleSessionCupomInUsing = (email = null) => {
  const emailIsAlreadyInUse = sessionStorage.getItem('email');

  if (emailIsAlreadyInUse) {
    handleRemoveModal();
    handleUnlockedCupons();
    return;
  }

  if (email) sessionStorage.setItem('email', email);
};

const handleQuanlityProductImages = () => {
  let imagesProduct = document.querySelectorAll(
    '.table.cart-items td.product-image img',
  );

  imagesProduct = [...imagesProduct];

  imagesProduct.forEach(image => {
    const imageURL = image.getAttribute('src');

    const replacedURL = imageURL.replace('70-70', '100-100');

    image.setAttribute('src', replacedURL);
  });
};

function setPromotionalBannersFromProductsPrice(value) {
  const promotionalBannerDesktop = document.querySelector(
    '.promotional__banner-desktop img',
  );
  const promotionalBannerMobile = document.querySelector(
    '.promotional__banner-mobile img',
  );

  if (value >= 60000) {
    promotionalBannerDesktop.setAttribute(
      'src',
      'https://lojabuettner.vteximg.com.br/arquivos/buettner-carrinho-banner-d-diadasmaes-2022-02.png',
    );
    promotionalBannerMobile.setAttribute(
      'src',
      'https://lojabuettner.vteximg.com.br/arquivos/buettner-carrinho-banner-m-diadasmaes-2022-02.png',
    );
  } else {
    promotionalBannerDesktop.setAttribute(
      'src',
      'https://lojabuettner.vteximg.com.br/arquivos/buettner-carrinho-banner-d-diadasmaes-2022-01.png',
    );
    promotionalBannerMobile.setAttribute(
      'src',
      'https://lojabuettner.vteximg.com.br/arquivos/buettner-carrinho-banner-m-diadasmaes-2022-01.png',
    );
  }
}

$(window).on('orderFormUpdated.vtex', function (_, orderForm) {
  const { value } = orderForm;

  setPromotionalBannersFromProductsPrice(value);
});

window.onload = function () {
  handleQuanlityProductImages();
};
