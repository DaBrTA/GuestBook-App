$('#add_user').submit(function (e) {
    alert("Data Saved Successfully")
})

$('#update_user').submit(function (e) {
    e.preventDefault();

    var unidexedArray = $(this).serializeArray();

    var data = {}

    $.map(unidexedArray, function (n, i) {
        data[n['name']] = n['value']
    })

    var request = {
        "url": 'http://localhost:3000/api/users/' + data.id,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function (response) {
        alert("Data updated successfully")
    })
})

if (window.location.pathname == "/") {
    $ondelte = $(".table tbody td a.delete");
    $ondelte.click(function () {
        var id = $(this).attr('data-id')

        var request = {
            "url": 'http://localhost:3000/api/users/' + id,
            "method": "DELETE"
        }

        if (confirm("Confirm Record Deletion")) {
            $.ajax(request).done(function (response) {
                location.reload();
                alert("Data Deleted successfully");
                
            })
        }

    })
}