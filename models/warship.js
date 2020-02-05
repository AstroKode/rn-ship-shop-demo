class Warship {
    constructor(id, ownerId, categoryIds, name, year, nationality, description, gunCaliber, speed, power, displacement, beltArmor, image, destroyed, isWW1EraShip) {
        this.id = id;
        this.ownerId = ownerId;
        this.categoryIds = categoryIds;
        this.name = name;
        this.year = year;
        this.nationality = nationality;
        this.description = description;
        this.gunCaliber = gunCaliber;
        this.speed = speed;
        this.power = power;
        this.displacement = displacement;
        this.beltArmor = beltArmor;
        this.image = image;
        this.destroyed = destroyed;
        this.isWW1EraShip = isWW1EraShip;
    };

    getSpeedKMH() {
        return 1.852 * this.speed
    }
    getCaliberInches() {
        return (0.0393700787 * this.gunCaliber).toFixed(0)
    }
    getArmorInches() {
        return (0.0393700787 * this.beltArmor).toFixed(1)
    }
    getPowerMW() {
        return (0.000745699872 * this.power).toFixed(0)
    }
}

export default Warship;