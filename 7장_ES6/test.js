var msg = "GLOBAL";
function outer(a) {
    var msg = "OUTER";
    console.log(msg);
    if (true) {
        var msg = "BLOCK";
        console.log(msg);
    }
}