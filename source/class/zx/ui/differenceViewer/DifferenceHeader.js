qx.Class.define("zx.ui.differenceViewer.DifferenceHeader", {
  extend: qx.ui.container.Composite,

  construct(title, { left, right, clear }) {
    super(new qx.ui.layout.HBox());

    this._add(title, { flex: 1 });

    const group = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
    group.setAppearance("difference-header-group");
    this.bind("showControls", group, "visibility", { converter: v => (v ? "visible" : "excluded") });

    group.add(this.getChildControl("btnLeft"));
    if (!left) this.getChildControl("btnLeft").addState("disabled");
    else this.getChildControl("btnLeft").addListener("execute", left);

    group.add(this.getChildControl("btnClear"));
    this.getChildControl("btnClear").addListener("execute", clear);

    group.add(this.getChildControl("btnRight"));
    if (!right) this.getChildControl("btnRight").addState("disabled");
    else this.getChildControl("btnRight").addListener("execute", right);

    this._add(group, { flex: 0 });
  },

  properties: {
    appearance: {
      init: "difference-header",
      refine: true
    },

    iconLeft: {
      check: "String",
      nullable: true,
      themeable: true,
      apply: "_applyIconLeft"
    },
    iconRight: {
      check: "String",
      nullable: true,
      themeable: true,
      apply: "_applyIconRight"
    },
    iconClear: {
      check: "String",
      nullable: true,
      themeable: true,
      apply: "_applyIconClear"
    },
    showControls: {
      check: "Boolean",
      nullable: false,
      init: true,
      event: "changeShowControls",
    }
  },

  members: {
    __actionLeft: null,
    __actionRight: null,
    __actionClear: null,

    _applyIconLeft(value) {
      this.getChildControl("btnLeft").setIcon(value);
    },

    _applyIconRight(value) {
      this.getChildControl("btnRight").setIcon(value);
    },

    _applyIconClear(value) {
      this.getChildControl("btnClear").setIcon(value);
    },

    _createChildControlImpl(id) {
      let control;

      switch (id) {
        case "btnLeft":
          control = new qx.ui.form.Button().set({ minWidth: 30 });
          control.setIcon(this.getIconLeft());
        case "btnRight":
          control = new qx.ui.form.Button().set({ minWidth: 30 });
          control.setIcon(this.getIconRight());
          break;
        case "btnClear":
          control = new qx.ui.form.Button().set({ minWidth: 30 });
          control.setIcon(this.getIconClear());
          break;
      }
      return control || super._createChildControlImpl(id);
    }
  }
});
