$('#paging').pagination({
    dataSource: '/images?page=1',
    locator: 'photos.photo',
    totalNumberLocator: function (response) {
        return response.photos.total
    },
    pageSize: 6,
    afterPageOnClick: function (event, pageNumber) {
        loadPage(pageNumber)
    },
    afterPreviousOnClick: function (event, pageNumber) {
        loadPage(pageNumber)
    },
    afterNextOnClick: function (event, pageNumber) {
        loadPage(pageNumber)
    }
})

function loadPage(page) {
    $.ajax({
        url: '/images?page=' + page
    })
        .then(data => {

            $('#content').html('')
            const images = data.photos.photo
            for (const e of images) {
                const item = $(`
                    <div class="col" >
                            <div class="card need-hover">
                                <img class="item123" data-value="${e._id}" src="${e.image}">
                                <div class="card-body">
                                    <div class="d-flex align-items-center">
                                        <i class="fa-solid fa-tag me-2"></i>
                                        <a href="#" class="me-2 fs-6 fst-italic">${e.tag[0]}</a>
                                        <a href="#" class="me-2 fs-6 fst-italic">${e.tag[1]}</a>
                                    </div>
                                    <p class="fs-3 text-dark text-uppercase text-flow-hidden">${e.name}</p>
                                    <p class="card-text text-flow-hidden fs-5"> ${e.name}</p>
                                    <div class="d-flex align-items-center mt-3">
                                        <div class="d-flex align-items-center me-3">
                                            <i class="fa-solid fa-clock"></i>
                                            <span class="small fw-lighter ms-2"
                                                  style="color: #929292">${e.updatedAt}</span>
                                        </div>
                                        <div class="d-flex align-items-center me-3">
                                            <i class="fa-solid fa-comment-dots"></i><span class="ms-2">777</span>
                                        </div>
                                        <a class="d-flex align-items-center me-3 text-decoration-none" href="#">
                                            <i class="fa-solid fa-share-nodes"></i><span class="ms-2">70000</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                `)
                $('#content').append(item)
            }
        })
        .catch(err => console.log(err.message))
}

$(document).ready(() => {

    $.ajax({
        url: 'users/getCurrentUserID',
        type: 'GET',
        success: (response) => {
            console.log(response.result.success)
            if (response.result.success && response.result.data !== null) {
                const name = response.result.data.firstName + '-' + response.result.data.lastName
                $('#dropdownMenuButton1').html(name)
                $('#SignIn').addClass('d-none')
                $('#SignOut').removeClass('d-none')
            }

            if (response.result.success && response.result.data === null) {
                $('#dropdownMenuButton1').html('Aucount')
                $('#SignIn').removeClass('d-none')
                $('#SignOut').addClass('d-none')
            }
        }
    })
        .done(() => console.log('done'))
        .fail((err) => console.log('fail ' + err))


    $.ajax({
        url: '/images',
        type: 'GET',
        success: (response) => {
            $('#content').html('')
            const images = response.photos.photo
            for (const e of images) {
                const item = $(`
                    <div class="col" >
                            <div class="card need-hover">
                                <img class="item123"  data-value="${e._id}" src="${e.image}">
                                <div class="card-body">
                                    <div class="d-flex align-items-center">
                                        <i class="fa-solid fa-tag me-2"></i>
                                        <a href="#" class="me-2 fs-6 fst-italic">${e.tag[0]}</a>
                                        <a href="#" class="me-2 fs-6 fst-italic">${e.tag[1]}</a>
                                    </div>
                                    <p class="fs-3 text-dark text-uppercase text-flow-hidden">${e.name}</p>
                                    <p class="card-text text-flow-hidden fs-5"> ${e.name}</p>
                                    <div class="d-flex align-items-center mt-3">
                                        <div class="d-flex align-items-center me-3">
                                            <i class="fa-solid fa-clock"></i>
                                            <span class="small fw-lighter ms-2"
                                                  style="color: #929292">${e.updatedAt}</span>
                                        </div>
                                        <div class="d-flex align-items-center me-3">
                                            <i class="fa-solid fa-comment-dots"></i><span class="ms-2">777</span>
                                        </div>
                                        <a class="d-flex align-items-center me-3 text-decoration-none" href="#">
                                            <i class="fa-solid fa-share-nodes"></i><span class="ms-2">70000</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                `)
                $('#content').append(item)
            }
        }
    })

    $('body').on('click','.item123',function(){
        window.location.href = `/images/${$(this).attr('data-value')}`
    })



    $('#SignOut').click(() => {
        const delete_cookie = function (name) {
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        };
        delete_cookie('token')
        document.location.href = '/'
    })


})
