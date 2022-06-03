import React, { useState } from 'react';

import { useMutation } from 'react-apollo';
import createDocument from '../../graphql/createDocument.graphql';

import { Alert } from 'vtex.styleguide';

import useError from '../../hooks/useError';

import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';

import FormGroup from '../FormGroup';
import styles from './styles.module.css';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [querySuccess, setQuerySuccess] = useState(false);
  const [queryError, setQueryError] = useState(false);

  const [createDocumentMutation] = useMutation(createDocument);

  const { errors, appendNewError, removeErrors, getMessageErrorByFieldName } =
    useError();

  const formIsValid =
    name && lastName && company && email && message && errors.length === 0;

  function handleNameChange(event: any) {
    setName(event.target.value);

    if (!event.target.value) {
      appendNewError({ field: 'name', message: 'O nome é obrigatório' });
    } else {
      removeErrors('name');
    }
  }

  function handleLastNameChange(event: any) {
    setLastName(event.target.value);

    if (!event.target.value) {
      appendNewError({
        field: 'lastName',
        message: 'O sobrenome é obrigatório',
      });
    } else {
      removeErrors('name');
    }
  }

  function handleCompanyChange(event: any) {
    setCompany(event.target.value);

    if (!event.target.value) {
      appendNewError({ field: 'name', message: 'O nome é obrigatório' });
    } else {
      removeErrors('name');
    }
  }

  function handleChangeEmail(event: any) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      appendNewError({ field: 'email', message: 'E-mail inválido' });
    } else {
      removeErrors('email');
    }
  }

  function handleChangePhone(event: any) {
    const formatedPhone = formatPhone(event.target.value);

    setPhone(formatedPhone);
  }

  async function handleFormSubmit(event: any) {
    event.preventDefault();

    const document = {
      fields: [
        { key: 'Nome', value: name },
        { key: 'Sobrenome', value: lastName },
        { key: 'Empresa', value: company },
        { key: 'Email', value: email },
        { key: 'Telefone', value: phone },
        { key: 'Mensagem', value: message },
      ],
    };

    console.log(document);

    await createDocumentMutation({
      variables: {
        acronym: 'CO',
        document: document,
      },
    })
      .then(() => {
        setQuerySuccess(true);
      })
      .catch((error: any) => {
        console.log(error);
        setQueryError(true);
      });
  }

  return (
    <>
      {queryError && (
        <Alert type="error">
          Tivemos um erro interno ao processar a sua mensagem, tente novamente
          mais tarde!
        </Alert>
      )}

      {!queryError && !querySuccess && (
        <form
          onSubmit={(event: any) => handleFormSubmit(event)}
          className={styles.contactForm}
        >
          <fieldset className={styles.contactFormFieldset}>
            <FormGroup error={getMessageErrorByFieldName('name')}>
              <label> Nome </label>
              <input
                type="text"
                onChange={(event: any) => handleNameChange(event)}
                value={name}
              />
            </FormGroup>
            <FormGroup error={getMessageErrorByFieldName('lastName')}>
              <label> Sobrenome </label>
              <input
                type="text"
                onChange={(event: any) => handleLastNameChange(event)}
                value={lastName}
              />
            </FormGroup>
          </fieldset>
          <FormGroup error={getMessageErrorByFieldName('company')}>
            <label> Empresa </label>
            <input
              type="text"
              onChange={(event: any) => handleCompanyChange(event)}
              value={company}
            />
          </FormGroup>
          <fieldset className={styles.contactFormFieldset}>
            <FormGroup error={getMessageErrorByFieldName('email')}>
              <label> E-mail </label>
              <input
                type="text"
                onChange={(event: any) => handleChangeEmail(event)}
                value={email}
              />
            </FormGroup>
            <FormGroup error={getMessageErrorByFieldName('phone')}>
              <label> Telefone </label>
              <input
                type="phone"
                onChange={(event: any) => handleChangePhone(event)}
                value={phone}
                maxLength={15}
              />
            </FormGroup>
          </fieldset>
          <FormGroup>
            <label> Mensagem </label>
            <textarea
              onChange={(event: any) => setMessage(event.target.value)}
              value={message}
              className={styles.messageInput}
            />
          </FormGroup>

          <FormGroup>
            <button
              type="submit"
              className={formIsValid ? styles.submitButton : styles.disabled}
            >
              Enviar
            </button>
          </FormGroup>
        </form>
      )}

      {querySuccess && (
        <Alert type="success">
          Recebemos sua mensagem, entraremos em contato em breve. Obrigado!
        </Alert>
      )}
    </>
  );
}

ContactForm.schema = {
  title: 'Formulário de Contato',
  description: 'Formulário de Contato da Página de Conteúdo',
};
