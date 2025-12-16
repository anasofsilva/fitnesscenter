window.onload = function() {
    // Your existing code
    const btnRegister = document.getElementById("btnRegister");
  
    if (btnRegister) {
      btnRegister.addEventListener("click", function() {
        Swal.fire({
          title: "Formulário de pré-inscrição",
          html:
            '<input id="swal-input1" class="swal2-input" placeholder="Nome">' +
            '<input id="swal-input2" class="swal2-input" placeholder="E-mail">',
          showCancelButton: true,
          confirmButtonText: "Inscrever",
          cancelButtonText: "Cancelar",
          showLoaderOnConfirm: true,
          preConfirm: () => {
            const name = document.getElementById('swal-input1').value;
            const email = document.getElementById('swal-input2').value;
  
            if (!name || !email) {
              Swal.showValidationMessage('Nome e e-mail são obrigatórios!');
              return;
            }
  
            return fetch(`${urlBase}/fitnesscenters/1/users/${encodeURIComponent(email)}`, {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              method: "POST",
              body: `nomeparticipant=${encodeURIComponent(name)}`
            })
            .then(response => {
              if (!response.ok) {
                throw new Error(response.statusText);
              }
              return response.json();
            })
            .catch(error => {
              Swal.showValidationMessage(`Request failed: ${error}`);
            });
          },
          allowOutsideClick: () => !Swal.isLoading()
        }).then(result => {
          if (result.isConfirmed) {
            if (!result.value.err_code) {
              Swal.fire({
                title: "Inscrição feita com sucesso!"
              });
            } else {
              Swal.fire({
                title: `${result.value.err_message}`
              });
            }
          }
        });
      });
    } else {
      console.error("Button with id 'btnRegister' not found.");
    }
  };
  