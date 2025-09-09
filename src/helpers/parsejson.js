const fs = require('fs');

// Load JSON
const raw = fs.readFileSync('./src/data/forminator-english-form-export.json', 'utf-8');
const form = JSON.parse(raw);

// Update all values to match their labels
if (form.data && Array.isArray(form.data.fields)) {
    form.data.fields.forEach(field => {
        if (field.options) {
            field.options.forEach(opt => {
                opt.value = opt.label; // 🔥 replace Arabic with English
            });
        }
    });
}

// Save back updated JSON
fs.writeFileSync(
    './src/data/forminator-english-form-export.updated.json',
    JSON.stringify(form, null, 2),
    'utf-8'
);

//console.log("✅ JSON updated: values now match labels");
