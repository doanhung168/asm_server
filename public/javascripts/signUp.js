$(document).ready(() => {
    $('#btnSubmit').click((e) => {
        e.preventDefault()
        const firstName = $('#firstName').val()
        const lastName = $('#lastName').val()
        const email = $('#email').val()
        const password = $('#password').val()
        const rePassword = $('#rePassword').val()

        const textValidE = $('#textValid')
        textValidE.html('')


        if(firstName.length === 0) {
            textValidE.html('Vui lòng nhập firstName')
            return
        }

        if(lastName.length === 0) {
            textValidE.html('Vui lòng nhập lastName')
            return
        }

        if(email.length === 0) {
            textValidE.html('Vui lòng nhập email')
            return
        }

        if(password.length <  6) {
            textValidE.html('Vui lòng nhập password lớn hơn 6 kí tự')
            return
        }

        if(rePassword !== password) {
            textValidE.html('Mật khẩu không trùng khớp')
            return
        }

        $.ajax({
            url: 'users/register',
            type: 'POST',
            data: {
                firstName,
                lastName,
                email,
                password
            },
            success: (response) => {
                console.log(response)
                if(response) {
                    textValidE.html(response.result.message)
                    if(response.result.success) {
                        $('input').val('')
                    }
                }

            }
        })
            .done(() => console.log('done'))
            .fail((e) => console.log('fail' + e))
    })
})