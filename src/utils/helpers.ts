export const getData = async () => {
    const response = await fetch('http://localhost:3000/src/db/invoices.csv')
    const text = await response.text()
    const csvHeader = text.slice(0, text.indexOf("\n")).split(",");
    const csvRows = text.slice(text.indexOf("\n") + 1).split("\n");

    const invoices = csvRows.map(i => {
        const values = i.split(",");
        const obj = csvHeader.reduce((object: any, header, index) => {
            object[header] = values[index];
            return object;
        }, {});
        return obj;
    });
    return invoices
}
