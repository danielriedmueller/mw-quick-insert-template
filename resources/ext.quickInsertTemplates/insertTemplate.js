( function () {
    const api = new mw.Api();
    const templateSelect = document.getElementById( "quick-insert-templates-top-select" );

    const insertTopTemplate = ( page, template ) => {
        api.getEditToken().then( ( token ) => {
            if (token) {
                api.edit( page, () => ( {
                    appendtext: "{{" + template + "}}",
                    token: token
                } ) ).then( ( data ) => {
                    if (data.error) {
                        console.log( "Error:", data.error.info );
                    } else if (data.edit) {
                        window.location.reload();
                    }
                } );
            }
        } );
    };

    templateSelect.addEventListener( "change", ( e ) => insertTopTemplate(
        e.target.dataset.page,
        e.target.value
    ) );
}() );
