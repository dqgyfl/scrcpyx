// merge dep/dev-dep for start project into root project
// hack: it seems dep have to be in root project otherwise cannot find native module
const fs = require('fs');

try {
    const jsonString = fs.readFileSync('package.json', 'utf8');
    const data = JSON.parse(jsonString);
    var starterDep = {}
    var addDep = {}
    var delDep = {}
    var dep = data.dependencies

    const pkgs = fs.readdirSync("dm")
        .map(pkg => JSON.parse(fs.readFileSync("dm/" + pkg + '/package.json', "utf8")))
    for (const pkg of pkgs) {
        if (pkg.name in data.dm) {
            addDep = {...addDep, ...pkg.dependencies}
            if (pkg.name.includes('starter')) {
                starterDep[pkg.name] = dep[pkg.name]
            }
        } else {
            delDep = {...delDep, ...pkg.dependencies}
        }
    }
    dep = Object.keys(dep).reduce((acc, key) => {
        if (!(key in delDep)) {
            acc[key] = dep[key];
        }
        return acc;
    }, {});
    dep = {...dep, ...addDep}
    data.dependencies = dep
    data.dependencies = {...starterDep, ...addDep}

    console.log(data);
    fs.writeFileSync('package.json', JSON.stringify(data, null, 2));
} catch (err) {
    console.log('Error reading file from disk:', err);
}
