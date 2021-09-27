function formParse(req, form) {
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, file) => {
            if (err) { reject(err) }
            resolve([fields, file]);
        });
    })
}

module.exports = formParse;