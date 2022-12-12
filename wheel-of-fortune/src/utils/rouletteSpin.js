const randomNumber = (min, max) => { 
    return Math.floor(Math.random() * (max - min) + min);
} 

const spinResults = (bets) => {
    const red = [1,3,5,7,9,10,12,14,16,18,19,21,23,25,27,28,30,32,36]
    const black = [2,4,6,8,11,13,15,17,20,22,24,26,29,31,33,34,35]
    const first12 = [1,2,3,4,5,6,7,8,9,10,11,12]
    const second12 = [13,14,15,16,17,18,19,20,21,22,23,24]
    const third12 = [25,26,27,28,29,30,31,32,33,34,35,36]
    const even = [2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36]
    const odd = [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35]
    const twotoonea = [3,6,9,12,15,18,21,24,27,30,33,36]
    const twotooneb = [2,5,8,11,,14,17,20,23,26,29,32,35]
    const twotoonec = [1,4,7,10,13,16,19,22,25,28,31,34]
    const first18 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
    const second18 = [19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36]

    const winner = randomNumber(0,36);
    console.log('spin result: ', winner);

    let earnings = 0;

    if( red.includes(winner) && 'red' in bets){
        earnings += bets['red']*2
    }

    if(black.includes(winner) && 'black' in bets){
        earnings += bets['black']*2
    }

    if( first12.includes(winner) && 'first12' in bets){
        earnings += (bets['first12']*2 + bets['first12'])
    }

    if(second12.includes(winner) && 'second12' in bets){
        earnings += (bets['second12']*2 + bets['second12'])
    }
    if(third12.includes(winner) && 'third12' in bets){
        earnings += (bets['third12']*2 + bets['third12'])
    }
    if( even.includes(winner) && 'even' in bets){
        earnings += bets['even']*2
    }

    if(odd.includes(winner) && 'odd' in bets){
        earnings += bets['odd']*2
    }
    if( twotoonea.includes(winner) && 'twotoonea' in bets){
        earnings += (bets['twotoonea']*2 + bets['twotoonea'])
    }

    if(twotooneb.includes(winner) && 'twotooneb' in bets){
        earnings += (bets['twotooneb']*2 + bets['twotooneb'])
    }
    if(twotoonec.includes(winner) && 'twotoonec' in bets){
        earnings += (bets['twotoonec']*2 + bets['twotoonec'])
    }
    if(first18.includes(winner) && 'first18' in bets){
        earnings += bets['first18']*2 
    }
    if(second18.includes(winner) && 'second18' in bets){
        earnings += bets['second18']*2 
    }

    if(winner in bets){
        earnings += (bets[winner]*35 + bets[winner]);
        console.log('earnings', earnings);
    }

    return {earnings, winnerNumber: winner}
}

export {spinResults};