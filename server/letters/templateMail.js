const from = 'information@ptkrf.com'
// eslint-disable-next-line no-unused-vars
const owner = 'ptk.dkm@gmail.com'

exports.getLetterToOwner = (objectMessage) => {
  const { email } = objectMessage

  return {
    from,
    to: owner,
    subject: 'Заявка с сайта на грузоперевозку.',
    text: `
      "Первая Транспортная Компания"
    
        Данные заявки: 
       -
        Email заказчика: ${email}
       -
        Имя заказчика: ${objectMessage.nameCustomer}
       -
        Телефон заказчика: ${objectMessage.phone}
       -
        Пункт отправления: ${objectMessage.departure}
       -
        Пункт назначения: ${objectMessage.destination}
       -
        Наименование груза: ${objectMessage.nameCargo}
       -
       -
        Пункт отправления: ${objectMessage.departure}
       -
        Пункт назначения: ${objectMessage.destination}
       -
        Наименование груза: ${objectMessage.nameCargo}
       -

       -

        Дополнительная информация по заявке:

        Габариты:
          Вес: ${objectMessage.weightCargo}, кг.
          Длина: ${objectMessage.lengthCargo}, м.
          Высота: ${objectMessage.heightCargo}, м.
          Ширина: ${objectMessage.widthCargo}, м.
       ---

        _____________________________________
        *Данное письмо создано автоматически и не требует ответа*`
  }
}

exports.getLetterForCustomer = (objectMessage) => {
  const { email } = objectMessage

  return {
    from,
    to: email.replace(/'/g, ''),
    subject: `Поздравляем, ${objectMessage.nameCustomer}! Ваша заявка на грузоперевозку принята!`,
    text: `
      "Первая Транспортная Компания"
    
        Данные заявки: 
       -
        Email: ${email}
       -  
        Ваш телефон: ${objectMessage.phone}
       -
       Габариты груза:
         Вес: ${objectMessage.weightCargo}, кг.
         Длина: ${objectMessage.lengthCargo}, м.
         Высота: ${objectMessage.heightCargo}, м.
         Ширина: ${objectMessage.widthCargo}, м.
          
      _
        *Данное письмо создано автоматически и не требует ответа*`
  }
}

exports.letterConfirm = (objectMessage) => {
  const ids = Math.floor(Math.random() * 101)
  const baseUrl = '//ptkrf.com/'
  return {
    from,
    to: 'best-jack@mail.ru',
    subject: 'Подтверждение (модерация) добавления отзыва на сайте.',
    html: `<p>
      <strong>"Первая Транспортная Компания"</strong>
      <br>
      <ul>
        <li>Данные отзыва: </li>
       <li>-<br></li>
        <li>Имя комментатора: <u>${objectMessage.name}</u></li>
       <li>-<br></li>
        <li>Организация: ${objectMessage.company || 'не указано'}</li>
       <li>-<br></li>
        <li>Текст комментария:</li>
        <li><b>${objectMessage.review}</b></li>
        </ul>
          <br>
      <a href="${baseUrl}confirm-admin/${objectMessage.uid}?id=${ids}">
      Ссылка на подтверждение комментария: ${baseUrl}confirm-admin/${objectMessage.uid}?id=${ids}</a>
      <br>
      <br>
      <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 17.391 20" width="17.391"><g fill="none" stroke-miterlimit="10" transform="translate(-486 -323.318)"><path d="m503.391 343.318-8.7-5.294-8.7 5.294v-20h17.391z"/><path d="m501.39129639 339.75875854v-14.44085693h-13.39132691v14.44082642l5.65557862-3.44326782 1.04006958-.63320923 1.04003906.63320923zm2 3.55914307-8.69567871-5.29412842-8.6956482 5.29412842v-20h17.39132691z" fill="#ff7c00"/></g></svg>
      <spna>Если комментарий Вас не устраивает, то просто проигнорируйте это письмо.</span>
      <br><br>
      <hr>
      <br>
        *Данное письмо создано автоматически и не требует ответа*</p>`

  }
}
