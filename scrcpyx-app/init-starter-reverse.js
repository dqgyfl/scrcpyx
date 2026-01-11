// merge dep/dev-dep for start project into root project
// hack: it seems dep have to be in root project otherwise cannot find native module
const fs = require('fs');

try {
    const jsonString = fs.readFileSync('package.json', 'utf8');
    const data = JSON.parse(jsonString);
    const dep = data.dependencies;

    const pkgs = fs.readdirSync("dm")
        .map(pkg => JSON.parse(fs.readFileSync("dm/" + pkg + '/package.json', "utf8")))
    for (const pkg of pkgs) {
        const pdep = pkg.dependencies
        for (wdep in pdep) {
            if (wdep in dep) {
                pdep[wdep] = dep[wdep];
            }
        }
        console.log("pkg", pkg);
        fs.writeFileSync(`dm/${pkg.name}/package.json`, JSON.stringify(pkg, null, 2));
    }

    // fs.writeFileSync('package.json', JSON.stringify(data, null, 2));
} catch (err) {
    console.log('Error reading file from disk:', err);
}
