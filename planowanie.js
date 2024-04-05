document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('trip-form');
    const messagesDiv = document.getElementById('form-messages');
    const showDataBtn = document.getElementById('show-data-btn');
    const downloadDataBtn = document.getElementById('download-data-btn');
    const savedDataDisplay = document.getElementById('saved-data-display');

    showDataBtn.addEventListener('click', function() {
    const savedData = localStorage.getItem('tripData');
    const displayContainer = document.getElementById('saved-data-display');

    if (savedData) {
        const dataObj = JSON.parse(savedData);
        displayContainer.innerHTML = ''; // Czyszczenie poprzednich danych

        Object.keys(dataObj).forEach(key => {
            const dataItem = document.createElement('div');
            dataItem.className = 'data-item';

            const label = document.createElement('label');
            label.textContent = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'); // Dodaje spacje przed dużymi literami

            const value = document.createElement('span');
            value.textContent = dataObj[key];

            dataItem.appendChild(label);
            dataItem.appendChild(value);
            displayContainer.appendChild(dataItem);
        });
    } else {
        displayContainer.textContent = 'Brak zapisanych danych.';
    }
});


    downloadDataBtn.addEventListener('click', function() {
        const savedData = localStorage.getItem('tripData');
        if (savedData) {
            const blob = new Blob([savedData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.setAttribute('href', url);
            a.setAttribute('download', 'tripData.json');
            a.click();
        } else {
            alert('Brak zapisanych danych do pobrania.');
        }
    });

    // Minimalne kwoty dla różnych miejsc
    const budgetRequirements = {
        "Polska - Bieszczady": 1000,
        "Brazylia - Amazonia": 5000,
        "Austria - Alpy": 3000,
        "USA - Yellowstone": 6000,
        "Japonia - Hokkaido": 7000,
        "Maroko - Atlas": 4000
    };

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        messagesDiv.textContent = ''; // Czyszczenie poprzednich komunikatów

        // Walidacja dat
        const startDate = new Date(document.getElementById('start-date').value);
        const endDate = new Date(document.getElementById('end-date').value);
        if(startDate > endDate) {
            messagesDiv.textContent = 'Data powrotu nie może być wcześniejsza niż data wyjazdu!';
            return;
        }

        // Walidacja budżetu
        const selectedDestination = form.destination.value;
        const budget = parseInt(form.budget.value, 10);
        if(budget < budgetRequirements[selectedDestination]) {
            messagesDiv.textContent = `Dla celu podróży "${selectedDestination}" minimalny budżet wynosi ${budgetRequirements[selectedDestination]} zł.`;
            return;
        }

        // Pobieranie wartości z formularza
        const formData = {
            cel: selectedDestination,
            wyjazd: form['start-date'].value,
            powrot: form['end-date'].value,
            typwycieczki: form['trip-type'].value,
            budzet: budget
        };

        // Zapisywanie danych w localStorage
        localStorage.setItem('tripData', JSON.stringify(formData));

        // Czyszczenie komunikatów i formularza po udanym zapisie
        messagesDiv.textContent = 'Plan podróży zapisany pomyślnie!';
        form.reset();
    });
});
