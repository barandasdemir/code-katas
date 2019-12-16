const {
    promises: fs
} = require('fs');
const endent = require('endent');
const fetch = require('node-fetch');

const usage = endent `
    usage: node generate.js option

    available options:
        new      create a new day or kata
        rename   rename a day or kata
        rm       delete a day or kata
        readme   generate the README.md based on current days & katas
`;

const newUsage = endent `
    usage: node generate.js new

    node generate.js new day                create a new day (new day's name is latest + 1)
    node generate.js new kata [-n] <link>   create a new kata

        -n   create a new day while creating the new kata
`;

const rmUsage = endent `
    usage: node generate.js rm

    node generate.js rm day <day>     delete day's directory
    node generate.js rm kata <kata>   delete a specific kata
`;

const renameUsage = endent `
    usage: node generate.js rm

    node generate.js rename <oldName> <newName>   rename a kata
`;

const katas = [];

(async () => {
    const argc = process.argv.length - 2;
    const dirs = await fs.readdir(__dirname, 'utf-8');
    const dayList = dirs.filter(name => name.startsWith('day_'));
    for (day of dayList) {
        const dayFiles = await fs.readdir(`./${day}`, 'utf-8');
        const dayKatas = dayFiles.filter(kata => kata.endsWith('.js'));
        katas.push({
            day,
            katas: dayKatas
        });
    }

    switch (argc) {
        case 1:
            switch (process.argv[2]) {
                case 'new':
                    console.log(newUsage);
                    break;
                case 'rename':
                    console.log(renameUsage);
                    break;
                case 'rm':
                    console.log(rmUsage);
                    break;
                case 'readme':
                    await generateReadme();
                    break;
                default:
                    console.log(usage);
                    break;
            }
            break;
        case 2:
            if (process.argv[2] === 'new') {
                if (process.argv[3] === 'day') {
                    await createNewDay();
                } else {
                    console.log(newUsage);
                }
            } else {
                console.log(usage);
            }
            break;
        case 3:
            if (process.argv[2] === 'rm') {
                if (process.argv[3] === 'day') {
                    const day = Number.parseInt(process.argv[4]);
                    if (Number.isSafeInteger(day)) {
                        fs.readdir(`./day_${day}`)
                            .then(async () => {
                                await fs.rmdir(`./day_${day}`, {
                                    recursive: true
                                })
                                console.log(`day ${day} has been successfully deleted!`);
                            })
                            .catch((err) => {
                                console.log(err);

                                console.log(`day ${day} cannot be found!`);
                            })
                    } else {
                        console.log("Error: 'day' should be a number");
                    }
                } else if (process.argv[3] === 'kata') {
                    const kata = process.argv[4];
                    const day = findKata(kata);
                    if (typeof day !== 'undefined') {
                        await fs.unlink(`./${day}/${kata}.js`);
                        console.log(`kata '${kata}' from day ${day.replace('day_', '')} has been successfully deleted!`);
                    }
                } else {
                    console.log(rmUsage);
                }
            } else if (process.argv[2] === 'new') {
                if (process.argv[3] === 'kata') {
                    const idorslug = process.argv[4].slice(30).split('/')[0];
                    const res = await fetch(`https://www.codewars.com/api/v1/code-challenges/${idorslug}`);
                    if (res.ok) {
                        const {
                            name,
                            slug,
                            url,
                            rank: {
                                name: kyu
                            }
                        } = await res.json();

                        const kataDay = findKata(slug);
                        if (kataDay) {
                            console.error(`you already solved the '${name}' kata on day ${kataDay.replace('day_', '')}, please pick a new one`)
                            break;
                        }

                        const day = (process.argv.find(arg => arg === '-n')) ? `day_${await createNewDay()}` : dayList[dayList.length - 1];
                        await fs.writeFile(`./${day}/${slug}.js`, '// you got this!', 'utf-8');

                        const kyuText = endent `# ${kyu}

                        * [${name}](${url})`;

                        fs.readFile(`./${day}/README.md`, 'utf-8')
                            .then(async (readme) => {
                                const kyuList = readme.match(/\d\skyu/g).map(k => Number.parseInt(k.replace(' kyu', '')));
                                const kyuNum = Number.parseInt(kyu.replace(' kyu', ''));
                                if (kyuList.includes(kyuNum)) {
                                    readme = readme.replace(`# ${kyu}\n`, kyuText);
                                } else {
                                    let append = true;
                                    for (k of kyuList) {
                                        if (kyuNum > k) {
                                            append = false;
                                            break;
                                        }
                                    }
                                    readme = (append) ? readme + `\n\n${kyuText}` : readme.replace(`# ${k} kyu`, `${kyuText}\n\n# ${k} kyu`);
                                }
                                await fs.writeFile(`./${day}/README.md`, readme, 'utf-8');
                            })
                            .catch(async () => {
                                await fs.writeFile(`./${day}/README.md`, genNewDayReadme() + kyuText, 'utf-8');
                            });
                    } else {
                        console.error('could not get a response from codewars API, aborting...');
                    }
                } else {
                    console.log(newUsage);
                }
            } else if (process.argv[2] === 'rename') {
                const oldName = process.argv[3];
                const newName = process.argv[4];
                const day = findKata(oldName);
                if (typeof day !== 'undefined') {
                    await fs.rename(`./${day}/${oldName}.js`, `./${day}/${newName}.js`);
                    console.log(`kata '${oldName}' from day ${day.replace('day_', '')} has been successfully renamed to '${newName}'!`);
                }
            } else {
                console.log(usage);
            }
            break;
        default:
            console.log(usage);
            break;
    }
})();

function findKata(name) {
    for (dir of katas) {
        const kata = dir.katas.find(kata => kata === `${name}.js`);
        if (kata) {
            return dir.day;
        }
    }
    console.error(`kata '${name}' does not exist!`);
}

async function createNewDay() {
    const dirs = await fs.readdir(__dirname, 'utf-8');
    const dayList = dirs.filter(name => name.startsWith('day_'));
    const day = Number.parseInt(dayList[dayList.length - 1].replace('day_', '')) + 1;
    const newDay = (day < 10) ? `${day}`.padStart(2, '0') : day;
    await fs.mkdir(`./day_${newDay}`);
    await fs.writeFile(`./day_${newDay}/README.md`, genNewDayReadme(), 'utf-8');

    console.log(`day ${newDay} has been created!`);
    return newDay;
}

function genNewDayReadme() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date();
    const heading = endent `# ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}\n\n`;
    return heading;
}

async function generateReadme() {
    let readme = endent `# what's this?

        this repo contains solutions to various katas from codewars.
        **_my_** solutions, btw.

        kata links can be found in each day's readme.

        # table of katas\n`;

    for (dir of katas) {
        const {
            day
        } = dir;

        try {
            const dayReadme = await fs.readFile(`./${day}/README.md`, 'utf-8');
            readme += endent `\n### [${day.replace('_', ' ')}](./${day})\n`;

            const sections = dayReadme.split(/\n#\s/g).splice(1);
            const kyus = dayReadme.match(/\d\skyu/g);

            kyus.forEach(kyu => {
                readme += `| ${kyu} `
            });

            readme += endent `|
            |:-----:|:-----:|:-----:|\n`;

            const secArr = []
            let max = 0;
            for (section of sections) {
                const kataList = section.match(/\*\s.*/g).map(kata => kata.replace('* ', ''));
                secArr.push(kataList);
                max = (kataList.length > max) ? kataList.length : max;
            }

            while (max > 0) {
                for (let i = 0; i < secArr.length; i++) {
                    const kata = secArr[i][0];
                    if (kata) {
                        const slug = kata.match(/\[.*\]/g)[0].slice(1, -1);
                        const link = kata.match(/\(.*\)/g)[0].slice(1, -1).replace(/(.*)*/, `./${day}/${slug}.js`);
                        readme += `|[${slug}](${link})`;
                    } else {
                        readme += '|';
                    }
                    secArr[i] = secArr[i].splice(1);
                }
                readme += '|\n';
                max--;
            }
        } catch (err) {
            console.error(err);
            console.error(`README for day ${day.replace('day_', '')} cannot be found, discarding`)
        }
    }

    fs.writeFile('./README.md', readme, 'utf-8')
        .then(() => {
            console.log('readme has been updated successfully!')
        })
        .catch(err => {
            console.log('error while writing readme to disk:', err);
        });
}
