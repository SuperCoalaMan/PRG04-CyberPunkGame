import { ImageSource, Loader } from 'excalibur'

const Resources = {
    PlayerWalk:     new ImageSource('/images/player/Walk.png'),
    PlayerIdle:     new ImageSource('/images/player/Idle.png'),

    Slime:      new ImageSource('/images/bot/Walk.png'),
    Bat:        new ImageSource('/images/drone/Walk.png'),

    Coin:       new ImageSource('/images/coin.png'),

    Ground:     new ImageSource('/images/GroundTilesmall.png'),
    Platform:   new ImageSource('/images/GroundTilesmall.png'),
    Background: new ImageSource('/images/CPBackground.jpg'),
}

const ResourceLoader = new Loader(Object.values(Resources))

export { Resources, ResourceLoader }
