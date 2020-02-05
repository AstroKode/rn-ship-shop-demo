import Category from '../models/category';
import Warship from '../models/warship';
import NationInfo from '../models/nationInfo';

export const CATEGORIES = [
    new Category('cv', 'new-jersey', '#47fced'),
    new Category('bb', 'new-jersey', '#ffc7ff'),
    new Category('cr', 'cruiser', '#b9ffb0'),
    new Category('dd', 'cruiser', '#41d95d')
];

export const WARSHIPS = [
    new Warship('s1', 'u1', 'bb', 'Bismarck', 1940, 'de', 'One of the mightiest battleships in the world by the start of World War II', 380, 30.8, 150170, 50405, 360, require('../assets/images/bismarck.jpg'), 1941, false),
    new Warship('s2', 'u1', 'cr', 'Atlanta', 1941, 'us', 'A relatively small ship for her type featuring powerful AA armament and designed for use in joint operations with destroyers.', 127, 32.5, 75000, 8470, 89, require('../assets/images/atlanta.jpg'), 1942, false),
    new Warship('s3', 'u2', 'cv', 'Enterprise', 1938, 'us', 'She participated in more major actions of the war against Japan than any other United States ship.', 127, 32.5, 120000, 25500, 102, require('../assets/images/enterprise.jpg'), null, false),
    new Warship('s4', 'u3', 'dd', 'Fletcher', 1942, 'us', 'Lead ship of the most numerous series of destroyers ever produced.', 127, 36, 60000, 2971, 20, require('../assets/images/fletcher.jpg'), null, false),
    new Warship('s5', 'u4', 'bb', 'Fuso', 1915, 'jp', 'One of the mightiest battleships of her time. When built, Fuso was the largest warship in the world. She had a fairly powerful artillery and reasonably heavy armor.', 356, 24.5, 75000, 35300, 305, require('../assets/images/fuso.jpg'), 1944, true),
    new Warship('s6', 'u5', 'bb', 'Hood', 1920, 'gb', 'A fast battle cruiser that had long remained the largest and one of the most powerful ships in the Royal Navy. The ship was built based on the experience gained during World War I.', 381, 32, 144000, 47430, 381, require('../assets/images/hood.jpg'), 1941, false),
    new Warship('s7', 'u6', 'cv', 'Hiryū', 1939, 'jp', 'An aircraft carrier that had a prominent effect on the development of this type of ship in the Imperial Japanese Navy. It was a highly successful project.', 127, 34, 153000, 20570, 150, require('../assets/images/hiryu.jpg'), 1942, false),
    new Warship('s8', 'u7', 'cr', 'Caledon', 1917, 'gb', 'Built during World War I. She was the name ship of the Caledon sub-class of the C class. She survived both world wars to be scrapped in 1948.', 152, 29, 40000, 4990, 76, require('../assets/images/caledon.jpg'), false, true),
    new Warship('s9', 'u8', 'dd', 'Umikaze', 1911, 'jp', 'The Umikaze-class destroyers were the first large destroyers designed for open ocean service to be built in Japan. They were largely based on British designs', 120, 33, 20500, 1170, 20, require('../assets/images/umikaze.jpg'), false, false),

];

const NationLookup = {
    'us': new NationInfo('the United States', 'US Navy'),
    'de': new NationInfo('Germany', 'Kriegsmarine'),
    'jp': new NationInfo('Japan', 'Imperial Japanese Navy'),
    'it': new NationInfo('Italy', 'Regia Marina'),
    'gb': new NationInfo('Great Britain', 'British Royal Navy')
}

export const getNationInfo = countryCode => {
    for (var key in NationLookup) {
        if (key === countryCode) {
            return NationLookup[key];
        }
    }
    return null;
}

const ShipClassLookup = {
    'cv': 'Aircraft carrier',
    'bb': 'Battleship',
    'cr': 'Cruiser',
    'dd': 'Destroyer'
}

export const classNameLookup = shipClass => {
    //var fullClassName;
    for (var key in ShipClassLookup) {
        if (key === shipClass) {
            return ShipClassLookup[key];
        }
    }
    return null
}