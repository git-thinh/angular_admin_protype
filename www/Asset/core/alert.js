/*================================================================*/
/*=== ALERT POPUP MODAL ===*/
/*================================================================*/

/**
* Alert show modal popup bootstrap
* @param options = { type: 'complete|error', title: '', content: '', ok: function{}, cancel: function{}  }
*/
function alertShow(options) {
    if (sessionStorage['alert-id'] != null && sessionStorage['alert-id'] != '') return;
    if (options == null) return;

    /** create id modal */
    var id = 'alert-' + 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });

    /** create event click */
    var event = options['ok'];
    if (event == null) event = options['cancel'];
    if (event != null && typeof (event) == 'function') {
        var btnEvent = document.createElement('input');
        btnEvent.style.display = 'none';
        btnEvent.id = 'btn-event-' + id;
        document.body.appendChild(btnEvent);
        btnEvent.addEventListener("click", event);
    }

    /** render UI modal popup */
    var type = options['type'], title = options['title'], content = options['content'];
    var m_header = '', m_content = '', m_footer = '';
    if (content == null) content = '';

    switch (type) {
        case 'complete':
            m_header = '';
            if (content == '') content = 'Complete';
            m_footer =
                    '<div class="modal-footer">' +
                    '    <button onclick="alertClose(\'' + id + '\')" type="button" class="btn _btn-webui _btn-width">OK</button>' +
                    '</div>';
            break;
        case 'error':
            if (title == null || title == '') title = 'Error';
            m_header =
                    '<div class="modal-header _bg_modal_title">' +
                    '    <button type="button" class="close" onclick="alertClose(\'' + id + '\')">&times;</button>' +
                    '    <h4 class="modal-title">' + title + '</h4>' +
                    '</div>';
            m_footer =
                    '<div class="modal-footer">' +
                    '    <button onclick="alertClose(\'' + id + '\')" type="button" class="btn _btn-webui _btn-width">OK</button>' +
                    '</div>';
            break;
        default:
            if (title != null || title != '') {
                m_header =
                    '<div class="modal-header">' +
                    '    <button type="button" class="close" onclick="alertClose(\'' + id + '\')">&times;</button>' +
                    '    <h4 class="modal-title">' + title + '</h4>' +
                    '</div>';
            }
            break;
    }
    m_content = '<p>' + content + '</p>';
    
    var htmModal =
    '    <div id="' + id + '" class="modal fade" role="dialog">' +
    '        <div class="modal-dialog">                        ' +
    '            <div class="modal-content">                   ' +
    m_header +
    '                <div class="modal-body">                  ' +
    m_content +
    '                </div>                                    ' +
    m_footer +
    '            </div>                                        ' +
    '        </div>                                            ' +
    '    </div>                                                ';




    $('body').append(htmModal);
    $('#' + id).modal('show');       
    sessionStorage['alert-id'] = id;
    $('#' + id).on('hidden.bs.modal', function (ev) {
        alertClose(id);
    });    
}

/**
* Alert close popup modal showing
*/
function alertClose(id) {
    sessionStorage['alert-id'] = '';
    var btnEvent = document.getElementById('btn-event-' + id);
    if (btnEvent != null) btnEvent.click();

    $('#btn-event-' + id).remove();
    $('#' + id).remove();
    $('div.modal-backdrop').remove();
    $('body').removeClass('modal-open');
    $('body').css({ 'padding-right': '0px' });
}

