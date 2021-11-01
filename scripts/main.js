// Option. Yes/No
let option = false;

function questionableButton() {
  if (Vars.headless) return;
  let hud = Vars.ui.hudGroup;
  hud.find(minimap/position).clearChildren();
  hud.find(minimap/position).button(Core.bundle.format("qt-kidnap", option.toString()), 
    Styles.clearTransi, run(() => {
      if (option) option = false;
      else option = true;
    })
  ).padTop(4).padRight(Core.settings.getBool("minimap") ? hud.find(minimap/position).width + 5 + 4 : 4).growX();
};

Events.on(ClientLoadEvent, () => {
  option = false;
  questionableButton();
});

Events.on(Trigger.update.getClass(), () => {
  // Disabled on servers, because you can get kicked/banned for that
  if (Vars.net.server()) return;
  let plr = Vars.player;
  if (option) {
    if (plr.unit() instanceof Payloadc) {
      print("test");
    } 
  }
});