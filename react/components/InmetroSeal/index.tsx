import React, { useState } from 'react';

import { useProduct } from 'vtex.product-context';

import { Modal } from 'vtex.styleguide';

import styles from './styles.module.css';

import Seals from './mocks';

interface SealProperties {
  title: string;
  description: string;
  alt: string;
  src: string;
}

export default function InmetroSeal() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const productContextValue = useProduct();

  function handleModalToggle() {
    setModalIsOpen(prevState => !prevState);
  }

  function getInmetroSeal(sealId: string) {
    // @ts-ignore
    return Seals[sealId];
  }

  const productSealId = productContextValue.product?.properties;

  const sealInfo = productSealId.find(
    ({ name }: string | any) => name === 'Selo INMETRO',
  );

  if (!sealInfo) return <></>;

  let currentInmetroSeal: SealProperties;

  const { values } = sealInfo;

  currentInmetroSeal = getInmetroSeal(values);

  return (
    <>
      <div className={styles.sealContainer}>
        <h1> Instruções </h1>

        <img src={currentInmetroSeal.src} alt="selo" />

        <button onClick={handleModalToggle}>Mais Informações</button>
      </div>

      {modalIsOpen && (
        <Modal isOpen={modalIsOpen} onClose={handleModalToggle}>
          <h1>{currentInmetroSeal.title}</h1>
          <span>{currentInmetroSeal.description}</span>
          <img src={currentInmetroSeal.src} alt={currentInmetroSeal.alt} />
        </Modal>
      )}
    </>
  );
}
