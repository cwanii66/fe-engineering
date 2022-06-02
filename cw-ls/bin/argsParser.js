module.exports = function() {
    const args = process.argv.slice(2)
    let isAll = false, // -a
        isList = false; // -l

    args.forEach(arg => {
        if (arg.includes('a')) {
            isAll = true
        }
        if (arg.includes('l')) {
            isList = true
        }
    })
    
    if (args.includes('-a')) {
        isAll = true
    }
    if (args.includes('-l')) {
        isList = true
    }

    return {
        args,
        isAll,
        isList
    }
}