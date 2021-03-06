namespace SpriteKind {
    export const Test = SpriteKind.create()
    export const ReplacedTile = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (PlayerStages == 1) {
        animation.runImageAnimation(
        PlayerSprite,
        assets.animation`FireFighterAnimUp`,
        150,
        true
        )
        CurrentPlayerAnim = 1
    }
})
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (PlayerSprite.tileKindAt(TileDirection.Right, assets.tile`IslandPart1`) || (PlayerSprite.tileKindAt(TileDirection.Right, assets.tile`IslandPart5`) || (PlayerSprite.tileKindAt(TileDirection.Left, assets.tile`IslandPart4`) || PlayerSprite.tileKindAt(TileDirection.Left, assets.tile`IslandPart7`)))) {
        TransportToLevel1()
    } else if (PlayerSprite.tileKindAt(TileDirection.Bottom, assets.tile`IslandPart1`) || (PlayerSprite.tileKindAt(TileDirection.Top, assets.tile`IslandPart5`) || (PlayerSprite.tileKindAt(TileDirection.Bottom, assets.tile`IslandPart4`) || PlayerSprite.tileKindAt(TileDirection.Top, assets.tile`IslandPart7`)))) {
        TransportToLevel1()
    } else {
    	
    }
})
function DouseTreeFire () {
    tiles.setTileAt(LocationOfFire, assets.tile`GrassTile`)
    WaterBolt.destroy()
    DousedFire = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.ReplacedTile)
    tiles.placeOnTile(DousedFire, LocationOfFire)
    animation.runImageAnimation(
    DousedFire,
    assets.animation`BurntTreeAnim`,
    500,
    true
    )
    info.changeScoreBy(250)
    RemainingFires += -1
    if (RemainingFires == 0) {
        TransportToOcean()
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.stopAnimation(animation.AnimationTypes.All, PlayerSprite)
    if (CurrentPlayerAnim == 0 && PlayerStages == 1) {
        PlayerSprite.setImage(assets.image`FireFighterSpecialActionDown`)
        WaterBolt = sprites.createProjectileFromSprite(assets.image`WaterBlastDown`, PlayerSprite, 0, 50)
        music.playMelody("E B C5 - - - - - ", 1000)
        WaterBolt.setBounceOnWall(false)
    } else if (CurrentPlayerAnim == 1 && PlayerStages == 1) {
        PlayerSprite.setImage(assets.image`FireFighterSpecialActionUp`)
        WaterBolt = sprites.createProjectileFromSprite(assets.image`WaterBlastUp`, PlayerSprite, 0, -50)
        music.playMelody("E B C5 - - - - - ", 1000)
        WaterBolt.setBounceOnWall(false)
    } else if (CurrentPlayerAnim == 2 && PlayerStages == 1) {
        PlayerSprite.setImage(assets.image`FireFighterSpecialActionRight`)
        WaterBolt = sprites.createProjectileFromSprite(assets.image`WaterBlastRight`, PlayerSprite, 50, 0)
        music.playMelody("E B C5 - - - - - ", 1000)
        WaterBolt.setBounceOnWall(false)
    } else if (CurrentPlayerAnim == 3 && PlayerStages == 1) {
        PlayerSprite.setImage(assets.image`FireFighterSpecialActionLeft`)
        WaterBolt = sprites.createProjectileFromSprite(assets.image`WaterBlastLeft`, PlayerSprite, -50, 0)
        music.playMelody("E B C5 - - - - - ", 1000)
        WaterBolt.setBounceOnWall(false)
    } else {
        PlayerSprite.sayText("Illegal dousing attempt", 500, false)
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (PlayerStages == 0) {
        animation.runImageAnimation(
        PlayerSprite,
        assets.animation`ClimarineAnimL`,
        500,
        true
        )
    } else {
        animation.runImageAnimation(
        PlayerSprite,
        assets.animation`FireFighterLeftAnim`,
        150,
        true
        )
        CurrentPlayerAnim = 3
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (PlayerStages == 0) {
        animation.runImageAnimation(
        PlayerSprite,
        assets.animation`ClimarineAnimR`,
        500,
        true
        )
    } else {
        animation.runImageAnimation(
        PlayerSprite,
        assets.animation`FireFighterRightAnim`,
        150,
        true
        )
        CurrentPlayerAnim = 2
    }
})
function TransportToOcean () {
    CurrentLevel = 0
    tiles.setTilemap(tilemap`Ocean`)
    scene.setBackgroundColor(9)
    PlayerStages = 0
    animation.stopAnimation(animation.AnimationTypes.All, PlayerSprite)
    PlayerSprite.setImage(assets.image`ClimarineR`)
    tiles.placeOnTile(PlayerSprite, tiles.getTileLocation(10, 8))
    animation.stopAnimation(animation.AnimationTypes.All, DousedFire)
    for (let value of sprites.allOfKind(SpriteKind.ReplacedTile)) {
        value.destroy()
    }
    controller.moveSprite(PlayerSprite, 40, 40)
}
function DouseFire () {
    tiles.setTileAt(LocationOfFire, assets.tile`GrassTile`)
    tiles.setWallAt(LocationOfFire, false)
    DousedFire = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.ReplacedTile)
    tiles.placeOnTile(DousedFire, LocationOfFire)
    animation.runImageAnimation(
    DousedFire,
    assets.animation`SmokeAnim`,
    500,
    true
    )
    WaterBolt.destroy()
    info.changeScoreBy(100)
    RemainingFires += -1
    if (RemainingFires == 0) {
        TransportToOcean()
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (PlayerStages == 1) {
        animation.runImageAnimation(
        PlayerSprite,
        assets.animation`FireFighterAnimDown`,
        150,
        true
        )
        CurrentPlayerAnim = 0
    }
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    TransportToOcean()
})
function TransportToLevel1 () {
    tiles.setTilemap(tilemap`FireLevel1`)
    DousedFire = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.ReplacedTile)
    CurrentLevel = 1
    Trackchooser = randint(0, 7)
    PlayerStages = 1
    animation.stopAnimation(animation.AnimationTypes.All, PlayerSprite)
    PlayerSprite.setImage(assets.image`ClimatianFireFighter0`)
    tiles.placeOnTile(PlayerSprite, tiles.getTileLocation(5, 15))
    RemainingFires = 56
    controller.moveSprite(PlayerSprite, 40, 40)
}
scene.onHitWall(SpriteKind.Projectile, function (sprite, location) {
    if (tiles.tileAtLocationEquals(location, assets.tile`BurningTreeTile`)) {
        LocationOfFire = location
        DouseTreeFire()
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`FireTile`, function (sprite, location) {
    tiles.placeOnTile(PlayerSprite, tiles.getTileLocation(5, 15))
})
scene.onOverlapTile(SpriteKind.Projectile, assets.tile`FireTile`, function (sprite, location) {
    LocationOfFire = location
    DouseFire()
})
let Trackchooser = 0
let RemainingFires = 0
let DousedFire: Sprite = null
let WaterBolt: Sprite = null
let LocationOfFire: tiles.Location = null
let CurrentPlayerAnim = 0
let PlayerStages = 0
let PlayerSprite: Sprite = null
let CurrentLevel = 0
CurrentLevel = 0
tiles.setTilemap(tilemap`Ocean`)
scene.setBackgroundColor(9)
PlayerSprite = sprites.create(assets.image`ClimarineR`, SpriteKind.Player)
controller.moveSprite(PlayerSprite, 40, 40)
tiles.placeOnTile(PlayerSprite, tiles.getTileLocation(10, 8))
scene.cameraFollowSprite(PlayerSprite)
PlayerStages = 0
info.setScore(0)
forever(function () {
    while (CurrentLevel == 0) {
        music.playMelody("C D - C D - A B ", 240)
        music.playMelody("E F - D E - G - ", 240)
        music.playMelody("A G - E F - D - ", 240)
        music.playMelody("B A - G A E F - ", 240)
    }
    while (CurrentLevel == 1) {
        if (Trackchooser == 6) {
            music.playMelody("D - E - C - D - ", 120)
            music.playMelody("C - D - E C - D ", 120)
            music.playMelody("C - D - C - D - ", 120)
            music.playMelody("E - D - F - C - ", 120)
        } else {
            music.playMelody("D E F D E D C D ", 480)
            music.playMelody("E - D E - F D C ", 480)
            music.playMelody("D E F G - F C D ", 400)
            music.playMelody("E D - F A D C - ", 500)
        }
    }
})
