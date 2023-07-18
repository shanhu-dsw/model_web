<template>
  <div>
    <el-dialog
      title="编辑识别区域"
      :visible.sync="showDialog"
      @open="showModal"
      @close="showDialog = false"
      center
      width="70%"
    >
      <div class="image-container">
        <img
          src="../../assets/images/武器库异动.jpg"
          ref="imageRef"
          class="image"
          style="width: 1200px; height: 800px;margin: 0 ;"
        />
        <div class="canvas-container">
          <canvas ref="canvasRef" class="canvas"></canvas>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; width: 100%">
        <el-button
          @click="toggleBox('A')"
          style="
            margin-top: 40px;
            background: #fa5151;
            color: #ffff;
            width: 10%;
          "
          >A区域</el-button
        >
        <el-button
          @click="toggleBox('B')"
          style="
            margin-top: 40px;
            background: #fa5151;
            color: #ffff;
            width: 10%;
          "
          >B区域</el-button
        >
        <el-button
          @click="toggleBox('C')"
          style="
            margin-top: 40px;
            background: #fa5151;
            color: #ffff;
            width: 10%;
          "
          >C区域</el-button
        >
        <el-button
          @click="toggleBox('D')"
          style="
            margin-top: 40px;
            background: #fa5151;
            color: #ffff;
            width: 10%;
          "
          >D区域</el-button
        >
      </div>
      <div style="display: flex; justify-content: space-between; width: 100%">
        <el-button
          @click="toggleLine('A')"
          style="
            margin-top: 40px;
            background: #ff8f1f;
            color: #ffff;
            width: 10%;
          "
          >A线</el-button
        >
        <el-button
          @click="toggleLine('B')"
          style="
            margin-top: 40px;
            background: #ff8f1f;
            color: #ffff;
            width: 10%;
          "
          >B线</el-button
        >
        <el-button
          @click="toggleLine('C')"
          style="
            margin-top: 40px;
            background: #ff8f1f;
            color: #ffff;
            width: 10%;
          "
          >C线</el-button
        >
        <el-button
          @click="toggleLine('D')"
          style="
            margin-top: 40px;
            background: #ff8f1f;
            color: #ffff;
            width: 10%;
          "
          >D线</el-button
        >
      </div>
      <el-button type="primary" style="margin:10px 10px;text-align:right;">保存</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { fabric } from "fabric";

export default {
  data() {
    return {
      showDialog: false,
      canvas: null,
      boxes: {},
      lines: {},
    };
  },
  methods: {
    showModal() {
      this.showDialog = true;
    },
    toggleBox(letter) {
      if (this.boxes[letter]) {
        this.canvas.remove(this.boxes[letter]);
        this.boxes[letter] = null;
      } else {
        this.addDefaultBox(letter);
      }
    },
    addDefaultBox(letter) {
      if (!this.canvas) {
        this.canvas = new fabric.Canvas(this.$refs.canvasRef);
      }

      const defaultLeft = 0;
      const defaultTop = 0;
      const defaultWidth = this.canvas.width;
      const defaultHeight = this.canvas.height;

      const rect = new fabric.Rect({
        left: defaultLeft,
        top: defaultTop,
        width: defaultWidth,
        height: defaultHeight,
        fill: "transparent",
        stroke: "red",
        strokeWidth: 2,
        cornerColor: "blue",
        cornerSize: 6,
        selectable: true,
        lockScalingX: false,
        lockScalingY: false,
      });
      const text = new fabric.Text(letter, {
        left: defaultLeft + defaultWidth / 2,
        top: defaultTop + defaultHeight / 2,
        fontSize: 50,
        originX: 'center',
        originY: 'center'
      });

      const group = new fabric.Group([rect,text], {
        left: defaultLeft,
        top: defaultTop,
      });

      group.on("modified", (event) => {
        const modifiedObject = event.target;
        const modifiedLeft = modifiedObject.left / defaultWidth;
        const modifiedTop = modifiedObject.top / defaultHeight;
        const modifiedWidth = modifiedObject.width / defaultWidth;
        const modifiedHeight = modifiedObject.height / defaultHeight;

        console.log(
          "矩形框位置和尺寸:",
          modifiedLeft,
          modifiedTop,
          modifiedWidth,
          modifiedHeight
        );
      });
      this.canvas.setWidth(1200);
      this.canvas.setHeight(800);
      this.canvas.add(group);
      this.canvas.setActiveObject(group);
      this.canvas.renderAll();
      this.boxes[letter] = group;
    },
    toggleLine(letter) {
      if (this.lines[letter]) {
        this.canvas.remove(this.lines[letter]);
        this.lines[letter] = null;
      } else {
        this.addDefaultLine(letter);
      }
    },
    addDefaultLine(letter) {
      const defaultX1 = 0; //线的起点横坐标
      const defaultY1 = 0; // 默认线的起点纵坐标
      const defaultX2 = 300; // 默认线的终点横坐
      const defaultY2 = 300; // 默认线的终点纵坐标

      const line = new fabric.Line([defaultX1, defaultY1, defaultX2, defaultY2], {
        stroke: '#ff8f1f',
        strokeWidth: 2,
        selectable: true,
      });

      const text = new fabric.Text(letter, {
        left: (defaultX1 + defaultX2) / 2,
        top: (defaultY1 + defaultY2) / 2,
        fontSize: 30,
        originX: 'center',
        originY: 'center'
      });

      const group = new fabric.Group([line, text], {
        left: (defaultX1 + defaultX2) / 2,
        top: (defaultY1 + defaultY2) / 2,
      });

      group.on('object:modified', (event) => {
      const modifiedObject = event.target;
      const modifiedLeft = modifiedObject.left;
      const modifiedTop = modifiedObject.top;
      console.log('移动后的位置:', modifiedLeft, modifiedTop);
    });



      this.canvas.add(group);
      this.canvas.setActiveObject(group);
      this.canvas.renderAll();

      this.lines[letter] = group; // 新增
    },
  },
};
</script>

<style>
.image-container {
  position: relative;
}

.image {
  display: block;
  max-width: 100%;
  height: auto;
  position: relative;
  z-index: 1;
}

.canvas-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2 !important; /* 设置更高的层叠顺序 */
}

.canvas {
  width: 100%;
  height: 100%;
}
</style>