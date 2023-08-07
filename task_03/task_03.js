const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const webSocketUrl = 'wss://echo-ws-service.herokuapp.com';
const sendButton = document.getElementById('send-button');
const locationButton = document.getElementById('location-button');
let webSocket;

// Функция для добавления сообщения в чат
function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add("message");
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Функция для инициализации WebSocket
function initializeWebSocket() {
    webSocket = new WebSocket(webSocketUrl);

    webSocket.onopen = () => {
        console.log('WebSocket connection opened');
    };

    webSocket.onmessage = (event) => {
        const message = event.data;
        appendMessage('Сервер: ' + message);
    };

    webSocket.onclose = () => {
        console.log('WebSocket connection closed');
    };
}

// Функция для отправки сообщения на сервер
function sendMessage() {
    const message = messageInput.value;
    if (message.trim() !== '') {
        appendMessage('Вы: ' + message);
        webSocket.send(message);
        messageInput.value = '';
    }
}

// Функция для отправки геолокации на сервер
locationButton.addEventListener('click', () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const mapLink = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=15/${latitude}/${longitude}`;
            appendLink('Вы отправили свою геолокацию', mapLink);
            webSocket.send(mapLink);
        }, (error) => {
            console.error('Ошибка получения геолокации: ', error);
            appendMessage('Ошибка получения геолокации.');
        });
    } else {
        appendMessage('Ваш браузер не поддерживает геолокацию.');
    }
});

// Функция для добавления активной ссылки с сообщением в чат
function appendLink(message, url) {
    const linkElement = document.createElement('a');
    linkElement.href = url;
    linkElement.target = '_blank';
    linkElement.textContent = message;

    const messageElement = document.createElement('div');
    messageElement.appendChild(linkElement);
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

sendButton.addEventListener('click', () => {
    sendMessage();
});

locationButton.addEventListener('click', () => {
    sendLocation();
});

// Инициализация WebSocket при загрузке страницы
window.onload = initializeWebSocket;
