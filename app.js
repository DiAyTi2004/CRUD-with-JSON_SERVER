const api = "http://localhost:3000/cars";
function start() {
    getCars(renderCars);
    handleCreateCar();
};
start();
function handleCreateCar() {
    const createBtn = document.querySelector('#createCar');
    createBtn.onclick = function () {
        const newName = document.querySelector('.input__carName').value;
        const newDescription = document.querySelector('.input__carDescription').value;
        if (newName && newDescription) {
            const data = {
                name: newName,
                description: newDescription
            }
            createCar(data);
        }
        else {
            alert('Vui lòng nhập đủ các trường!');
        }
    }
}
function getCars(callback) {
    fetch(api)
        .then(response => response.json())
        .then(callback)
}
function closeEditModal() {
    const editModal = document.querySelector('.modal__edit');
    editModal.remove();
}
function closeDeleteModal() {
    const editModal = document.querySelector('.modal__delete');
    editModal.remove();
}
function handleShowEditDialog(carName, carDescription, id) {
    const modalWrapper = document.createElement('div');
    modalWrapper.classList.add('modal__wrapper', 'modal__edit');
    modalWrapper.innerHTML = `
    <div class="modal">
            <div class="modal__heading">
                <h2 class="modal__tit">Chỉnh sửa:</h3>
                <div class="modal__close" onclick="closeEditModal();">
                    <i class="fa-solid fa-xmark"></i>
                </div>
            </div>
            <div class="modal__group">
                <label for="" class="modal__name">Tên:</label>
                <input type="text" name="carName" class="modal__input" value="${carName}">
            </div>
            <div class="modal__group">
                <label for="" class="modal__name">Mô tả:</label>
                <input type="text" name="carDescription" class="modal__input" value="${carDescription}">
            </div>
            <button class="modal__confirm" onclick="handleUpdate( ${id});">Cập nhật</button>
        </div>
    `;
    document.querySelector('body').appendChild(modalWrapper);
}
function handleUpdate(id) {
    const data = {};
    const editModal = document.querySelector('.modal__edit');
    let nameInputValue = editModal.querySelector('input[name="carName"]').value;
    let descriptionInputValue = editModal.querySelector('input[name="carDescription"]').value;
    data.name = nameInputValue;
    data.description = descriptionInputValue;
    updateCar( data, id);
}
function handleShowConfirmDeleteDialog(carName, carDescription, id) {
    const modalWrapper = document.createElement('div');
    modalWrapper.classList.add('modal__wrapper', 'modal__delete');
    modalWrapper.innerHTML = `
    <div class="modal">
            <h2 class="modal__content">
                Bạn có chắc xóa phần tử này chứ?
            </h2>
            <div class="modal__body">
                <h3 class="modal__infor modal__name">
                    ${carName}
                </h3>
                <h5 class="modal__infor modal__des">
                    ${carDescription}
                </h5>
            </div>
            <div class="modal__btn-list">
                <button class="modal__confirm" onclick="deleteCar( '${id}')">Xóa</button>
                <button class="modal__confirm modal__cancel" onclick="closeDeleteModal();">Hủy</button>
            </div>
        </div>
    `;
    document.querySelector('body').appendChild(modalWrapper);
}
function renderCars(cars) {
    const carsList = document.querySelector('.carsList');
    let html = '';
    cars.forEach((car, index) => {
        const carName = car.name;
        const carDescription = car.description;
        html += (
            `<li class="car">
            <div class="car__body">
                <h3 class="car__name">${car.name}</h3>
                <p class="car__description">${car.description}</p>
            </div>
            <div class="car__options">
                <button class="car__btn car__edit" onclick="handleShowEditDialog( '${carName}', '${carDescription}', '${car.id}');">
                    <i class="fa-solid fa-pencil"></i>
                    Sửa
                </button>
                <button class="car__btn car__delete" onclick="handleShowConfirmDeleteDialog( '${carName}', '${carDescription}', '${car.id}');">
                    <i class="fa-solid fa-trash-can"></i>
                    Xóa
                </button>
            </div>
        </li>`
        );
    });
    carsList.innerHTML = html;
}
function createCar(data) {
    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(api, option)
        .then(response => response.json())
        .then()
}
function deleteCar(id) {
    var option = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    fetch(api + '/' + id, option)
        .then(response => response.json())
        .then(closeDeleteModal)
}
function updateCar(data, id) {
    const option = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(api + '/' + id, option)
        .then(response => response.json())
        .then()
}