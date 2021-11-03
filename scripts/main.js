// Option. Yes or No. Becomes false upon loading the game as of now
let option = false;

function questionableButton() {
  if (Vars.headless) return;
  let t = Vars.ui.hudGroup.find("minimap/position");
  t.row();
  t.table(Tex.button, tt => {
    tt.table(Styles.none, ttt => {
      ttt.button(Icon.units, 
        Styles.clearToggleTransi, run(() => {
          option = !option;
          print(option); // test
        })
      ).scaling(Scaling.bounded).grow().maxWidth(54).padTop(4); 
      ttt.label(() => Core.bundle.format(("qt.deconMove"), option.toString())).padLeft(4);
    }).margin(4);
    tt.row();
    tt.label(() => Vars.net.server() ? Core.bundle.get("qt.serverWarning") : "")
    .update(l => l.setColor(Tmp.c1.set(Color.white).lerp(Color.scarlet, Mathf.absin(Time.time, 10, 1))))
    .padTop(4).center().growX();
  }).margin(4);
};

Events.on(ClientLoadEvent, () => {
  option = false;
  questionableButton();
});

Events.on(Trigger.update.getClass(), () => {
  // Disabled little trolling on servers, because you can get kicked/banned for that
  if (Vars.net.server() || Vars.state.isPaused()) return;
  // Player unit
  let player = Vars.player;
  if (option) {
    let range = Math.max(player.unit().type.range + 1, 75);
    let u = Units.closest(
      player.unit().team, player.unit().getX(), player.unit().getY(), range, ally => 
      ally.health > 0 && ally != player.unit() && !(ally.isFlying() && ally.type.canBoost)
    );
    if (u != null && u.team == player.unit().team && player.unit() instanceof Payloadc && u.within(player.unit().x, player.unit().y, range)) {
      //player.unit().moveTo(u, range);
      player.unit().lookAt(u);
    }
  }
});

// Finally print on successful load
print("Questionable Things (QT) loaded!");