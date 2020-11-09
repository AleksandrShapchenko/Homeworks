// filterUpperCase("ПриВЕт") // вернет [ 'П', 'В' ,'Е']

function filterUpperCase(string) {
    return [].filter.call(string, (item => item.toUpperCase() == item));
}

console.log(filterUpperCase("ПриВЕт"));
