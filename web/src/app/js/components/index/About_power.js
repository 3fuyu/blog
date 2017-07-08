/**
 * Created by 3fuyu on 2017/7/7.
 */

import {Component} from 'react';

let canvas,
    mW = 380,
    mH = 380,
    mData = [
        ['es6/7', 65],
        ['html/html5', 82],
        ['react', 78],
        ['js', 90],
        ['css/css3', 81],
        ['nodejs', 60],
    ],

    mCount = mData.length, //边数
    mCenter = mW / 2, //中心点
    mRadius = mCenter - 50, //半径(减去的值用于给绘制的文本留空间)
    mAngle = Math.PI * 2 / mCount, //角度
    mCtx = null,
    mColorPolygon = '#B8B8B8', //多边形颜色
    mColorLines = '#B8B8B8', //顶点连线颜色
    mColorText = '#000000';

class About extends Component {
    componentDidMount() {
        this.initDraw();
    }

    initDraw() {
        canvas = document.createElement('canvas');
        document.getElementsByClassName('power')[0].appendChild(canvas);
        canvas.height = mH;
        canvas.width = mW;
        mCtx = canvas.getContext('2d');

        this.drawPolygon(mCtx);
        this.drawLines(mCtx);
        this.drawText(mCtx);
        this.drawRegion(mCtx);
        this.drawCircle(mCtx);
    }

    drawPolygon(ctx) {
        ctx.save();

        ctx.strokeStyle = mColorPolygon;
        var r = mRadius / mCount; //单位半径
        //画6个圈
        for (var i = 0; i < mCount; i++) {
            ctx.beginPath();
            var currR = r * ( i + 1); //当前半径
            //画6条边
            for (var j = 0; j < mCount; j++) {
                var x = mCenter + currR * Math.cos(mAngle * j);
                var y = mCenter + currR * Math.sin(mAngle * j);

                ctx.lineTo(x, y);
            }
            ctx.closePath()
            ctx.stroke();
        }

        ctx.restore();
    }

    //顶点连线
    drawLines(ctx) {
        ctx.save();

        ctx.beginPath();
        ctx.strokeStyle = mColorLines;

        for (var i = 0; i < mCount; i++) {
            var x = mCenter + mRadius * Math.cos(mAngle * i);
            var y = mCenter + mRadius * Math.sin(mAngle * i);

            ctx.moveTo(mCenter, mCenter);
            ctx.lineTo(x, y);
        }

        ctx.stroke();
        ctx.restore();
    }

    //绘制文本
    drawText(ctx) {
        ctx.save();

        var fontSize = mCenter / 12;
        ctx.font = fontSize + 'px Microsoft Yahei';
        ctx.fillStyle = mColorText;

        for (var i = 0; i < mCount; i++) {
            var x = mCenter + mRadius * Math.cos(mAngle * i);
            var y = mCenter + mRadius * Math.sin(mAngle * i);

            if (mAngle * i >= 0 && mAngle * i <= Math.PI / 2) {
                ctx.fillText(mData[i][0], x, y + fontSize);
            } else if (mAngle * i > Math.PI / 2 && mAngle * i <= Math.PI) {
                ctx.fillText(mData[i][0], x - ctx.measureText(mData[i][0]).width, y + fontSize);
            } else if (mAngle * i > Math.PI && mAngle * i <= Math.PI * 3 / 2) {
                ctx.fillText(mData[i][0], x - ctx.measureText(mData[i][0]).width, y);
            } else {
                ctx.fillText(mData[i][0], x, y);
            }

        }

        ctx.restore();
    }

    //绘制数据区域
    drawRegion(ctx) {
        ctx.save();

        ctx.beginPath();
        for (var i = 0; i < mCount; i++) {
            var x = mCenter + mRadius * Math.cos(mAngle * i) * mData[i][1] / 100;
            var y = mCenter + mRadius * Math.sin(mAngle * i) * mData[i][1] / 100;

            ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.fill();

        ctx.restore();
    }

    //画点
    drawCircle(ctx) {
        ctx.save();

        var r = mCenter / 40;
        for (var i = 0; i < mCount; i++) {
            var x = mCenter + mRadius * Math.cos(mAngle * i) * mData[i][1] / 100;
            var y = mCenter + mRadius * Math.sin(mAngle * i) * mData[i][1] / 100;

            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
            ctx.fill();
        }

        ctx.restore();
    }

    render() {
        return (
            <div className="power"></div>
        );
    }
}

export default About;
