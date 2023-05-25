(function () {

    const botName = 'Dan@EditorBot';
    const botPwd = 'e1jqh448ch0n2ebcg401nh3ab74lnoa2';

    const addTemplateButton = document.getElementById('quick-insert-templates-button');
    const templateSelect = document.getElementById('quick-insert-templates-top-select');
    templateSelect.addEventListener('change', (e) => {
        const selectedTemplate = e.target.value;
        addTemplate(selectedTemplate);
    });

    const addTemplate = (template) => {
        // Define the API endpoint
        var apiEndpoint = 'http://localhost/api.php';
        obtainApiToken().then((token) => {
            if (token) {

                // Define the parameters
                var params = {
                    action: 'edit',
                    format: 'json',
                    title: 'Hauptseite',
                    appendtext: '{{' + template + '}}',
                    summary: 'Adding template to page',
                    token: token // Replace with your API token
                };

                // Make the API request
                $.ajax({
                    url: apiEndpoint,
                    type: 'POST',
                    dataType: 'json',
                    data: params,
                    success: function (data) {
                        if (data.error) {
                            console.log('Error:', data.error.info);
                        } else if (data.edit) {
                            console.log('Template appended successfully!');
                        }
                    },
                    error: function (xhr, status, error) {
                        console.log('Request failed with status code:', xhr.status);
                    }
                });
            }
        });

    }

    async function obtainApiToken() {
        try {
            // Create an instance of mw.Api()
            const api = new mw.Api();

            // Get the CSRF token for API authentication
            const tokenResponse = await api.get({
                action: 'query',
                meta: 'tokens',
                format: 'json'
            });

            // Extract the API token from the response
            const apiToken = tokenResponse?.query?.tokens?.csrftoken;

            if (apiToken) {
                // Use the API token for further API requests
                console.log('API token obtained:', apiToken);
                return apiToken;
            } else {
                console.log('Failed to obtain API token.');
                return null;
            }
        } catch (error) {
            console.error('Error obtaining API token:', error);
            return null;
        }
    }
}());
