
// Получаем элементы HTML
const addCommentForm = document.querySelector('.add-comment-form');
const commentsList = document.querySelector('.comments-list');

// Обработчик отправки формы
addCommentForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Получаем значения полей формы
    const name = addCommentForm.elements.name.value;
    const text = addCommentForm.elements.text.value;
    const date = addCommentForm.elements.date.value;

    // Валидация формы
    if (!name) {
        showError(addCommentForm.elements.name, 'Введите имя');
        return;
    }

    if (!text) {
        showError(addCommentForm.elements.text, 'Введите текст');
        return;
    }

    // Создаем элемент комментария
    const comment = document.createElement('li');
    comment.classList.add('comment');

    // Создаем элементы для отображения информации о комментарии
    const author = document.createElement('span');
    author.classList.add('comment-author');
    author.textContent = name;

    const commentDate = document.createElement('span');
    commentDate.classList.add('comment-date');
    commentDate.textContent = formatDate(date);

    const commentText = document.createElement('p');
    commentText.classList.add('comment-text');
    commentText.textContent = text;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-comment-button');
    deleteButton.innerHTML = '&#128465;';

    const likeButton = document.createElement('button');
    likeButton.classList.add('like-comment-button');
    likeButton.innerHTML = '&#10084;';

    // Добавляем элементы в комментарий
    comment.appendChild(author);
    comment.appendChild(commentDate);
    comment.appendChild(commentText);
    comment.appendChild(deleteButton);
    comment.appendChild(likeButton);

    // Добавляем комментарий в список
    commentsList.appendChild(comment);

    // Очищаем форму
    addCommentForm.reset();
});

// Обработчик изменения значения поля
addCommentForm.addEventListener('input', (event) => {
    const input = event.target;

    // Скрываем ошибку, если она была отображена
    hideError(input);
});

// Обработчик клика по кнопке удаления комментария
commentsList.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('delete-comment-button')) {
        const comment = target.closest('.comment');
        comment.remove();
    }
});

// Обработчик клика по кнопке лайка комментария
commentsList.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('like-comment-button')) {
        target.classList.toggle('liked');
    }
});

// Функция отображения ошибки
function showError(input, message) {
    const error = document.createElement('span');
    error.classList.add('error-message');
    error.textContent = message;
    input.insertAdjacentElement('afterend', error);
}

// Функция скрытия ошибки
function hideError(input) {
    const error = input.nextElementSibling;

    if (error && error.classList.contains('error-message')) {
        error.remove();
    }
}

// Функция форматирования даты комментария
function formatDate(dateString) {

    if (!dateString || isNaN(Date.parse(dateString))) { // проверка на наличие и правильность даты
        return "Дата не задана";
    } else {
        const date = new Date(dateString);
        const today = new Date();

        if (date.toDateString() === today.toDateString()) {
            return 'Сегодня, ' + formatTimeWithTimeZone(today);
        } else if (date.toDateString() === new Date(today.setDate(today.getDate() - 1)).toDateString()) {
            return 'Вчера ';
        } else {
            return date.toLocaleDateString();
        }
    }
}

// Функция форматирования времени комментария
function formatTimeWithTimeZone(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
  
    if (hours < 10) {
      hours = "0" + hours;
    }
  
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
  
    const timeZoneOffset = date.getTimezoneOffset() / 60;
    const timeZoneSign = timeZoneOffset > 0 ? "-" : "+";
    const timeZoneHours = Math.abs(Math.floor(timeZoneOffset));
    const timeZoneMinutes = Math.abs(timeZoneOffset % 1) * 60;
  
    const timeZoneString =
      " GMT" + timeZoneSign + timeZoneHours + ":" + timeZoneMinutes;
  
    return hours + ":" + minutes + timeZoneString;
  }