$('#paging').pagination({
    dataSource: '/getData?page=1',
    locator: 'photos.photo',
    totalNumberLocator: function(response) {
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
        url: '/getData?page=' + page
    })
        .then(data => {

            $('#content').html('')
            const images = data.photos.photo
            for(const e of images) {
                const item = $(`
                    <div class="col item" data-value="${e._id}">
                            <div class="card need-hover">
                                <img src="${e.image}">
                                <div class="card-body">
                                    <div class="d-flex align-items-center">
                                        <i class="fa-solid fa-tag me-2"></i>
                                        <a href="#" class="me-2 fs-6 fst-italic">${e.tag[0]}</a>
                                        <a href="#" class="me-2 fs-6 fst-italic">${e.tag[1]}</a>
                                    </div>
                                    <p class="fs-3 text-dark text-uppercase text-flow-hidden">${e.name}</p>
                                    <p class="card-text text-flow-hidden fs-5"> ${e.name }</p>
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