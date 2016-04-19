# Manipulatorリファレンス

## 音色ファイル
音色はJSON形式で記述します。  
ManipulatorではこのJSONオブジェクトをRecipeと呼びます。  
オシレータやフィルタなどの部品はModuleとして管理されます。  
Recipeで指定するModuleの基本的な形式は以下のようになっています。

```js
{
    //Moduleはname, [param, input]をプロパティとして持ちます。
    name: 'Moduleの名前',
    param: {
        //ここにはModuleごとの設定を記述します。
        gain: 0.7
    },
    input: {
        //このModuleにつなぐModuleを記述します。
    }
}
```

## Moduleの種類
デフォルトで用意されているModuleは以下の通りです。

- Mixer

    inputプロパティにしていしたModuleオブジェクトのリストをまとめます。  
    paramプロパティはありません。  
    ミックスする音量はVCA Moduleで設定します。

- VCO

    音源となるオシレータのModuleです。  
    paramに設定できるパラメータは次の通りです。

| パラメータ | |省略可|
|:-----------:|:------------|:---:|
| frequency|波形の周波数を単位Hzで指定します。<br>'cv'を指定するとnoteOnで指定したノートナンバーに対応する周波数が設定されます。<br>他のModuleを指定することもできます。|×|
|type|波形の種類を設定します。<br>指定できる波形の種類は以下の表の通りです。|×|
|octave|frequencyの値に指定した数値をかけた値が実際の周波数として設定されます。デフォルトは1です。|◯|
|detune|指定した数値だけfrequencyの値に足した値が実際の周波数として設定されます。単位はセントです。|◯|

    typeで指定できる波形の種類です。

| type | 波形 |
|:------:|:------------|
|'sine'|サイン波|
|'square'|デューティ比 0.5 の矩形波|
|'sawtooth'|鋸歯状波|
|'triangle'|三角波|

- Env

    エンベロープを設定するModuleです。  
    paramに設定できるパラメータは次の通りです。

| パラメータ | |省略可|
|:-----------:|:------------|:---:|
|gain|音の大きさを指定します。|×|
|attack|Attackの値を指定します。|×|
|decay|Decayの値を指定します。|×|
|sustain|Sustainの値を指定します。|×|
|release|Releaseの値を指定します。|×|

- VCA

    音量を調整するModuleです。  
    paramに設定できるパラメータは次の通りです。

| パラメータ | |省略可|
|:-----------:|:------------|:---:|
|gain|音の大きさを指定します。|×|

- VCF

    フィルタを設定するModuleです。  
    paramに設定できるパラメータは次の通りです。

| パラメータ | |省略可|
|:-----------:|:------------|:---:|
| frequency|フィルタの中心周波数を単位Hzで指定します。<br>'cv'を指定するとnoteOnで指定したノートナンバーに対応する周波数が設定されます。<br>他のModuleを指定することもできます。|×|
|type|フィルタの種類を設定します。指定できるフィルタの種類は以下の表の通りです。|×|
|Q|フィルタのQ値を設定します。|×|
|gain|フィルタのgainを設定します。|×|
|detune|指定した数値だけfrequencyの値に足した値が実際の周波数として設定されます。単位はセントです。|◯|

    typeで指定できるフィルタの種類です。  
    詳細はWeb Audio APIのBiquadFilterNodeを参照してください。

| type | 波形 |
|:------:|:------------|
|'lowpass'|ローパスフィルタです。|
|'highpass'|ハイパスフィルタです。|
|'bandpass'|バンドパスフィルタです。|
|'lowshelf'|ローシェルフフィルタです。|
|'highshelf'|ハイシェルフフィルタです。|
|'peaking'|ピーキングフィルタです。|
|'notch'|ノッチフィルタです。|

- Noise

    音源となるノイズのModuleです。  
    Math.random()によるノイズを出力します。  
    paramもinputもありません。

- Delay

    エフェクトとしてのディレイを設定するModuleです。  
    paramに設定できるパラメータは次の通りです。

| パラメータ | |省略可|
|:-----------:|:------------|:---:|
|delayTime|遅延時間です。<br>他のModuleを指定することもできます。|×|
|feedback|ディレイのフィードバック量です。|×|
|mix|ウェット音とドライ音のバランスです。1でウェット音のみになります。|×|


## Manipulatorオブジェクト

    1つのManipulatorオブジェクトが1つの音色を担当します。
    Manipulatorオブジェクトのコンストラクタは以下の通りです。

| コンストラクタ |説明|
|:------:|:------------|
|Manipulator(ctx, recipe[, moduleManager])|**ctx**：Web Audio APIのAudioContextです。<br>**recipe**：音色を決めるJSONです。<br>**moduleManager**：追加Moduleを設定したModuleManager(省略可)|

    Manipulatorオブジェクトのメソッドは以下の通りです。

| メソッド |説明|
|:------:|:------------|
|noteOn(noteNo[, time])|noteNoで指定した番号に対応する音高の音をtimeで指定したタイミングでならします。timeを省略するとメソッドが呼ばれたタイミングで音をならします。|
|noteOff([time])|timeで指定したタイミングで音を止めます。timeを省略するとメソッドが呼ばれたタイミングで音を止めます。|

    timeはWeb Audio APIのAudioContextで取得できるものが基準になります。

```js
var AudioContext = window.AudioContext || window.webkitAudioContext;
var ctx = new AudioContext();
var now = ctx.currentTime;
```

### Moduleの追加
ModuleManagerを作成しModuleを設定する関数を登録することで新しくModuleを追加することが出来ます。

```js
//ModuleManagerを作成
var mm = new ModuleManager();
//VCO2 Moduleを登録
mm.registerModule('VCO2', setVCO2, 'VCO');
var tone= new Manipulator(ctx, toneRecipe, mm);
```

ModuleManagerのメソッドは以下の通りです。

| メソッド |説明|
|:------:|:------------|
|registerModule(name, setModule[, option]);|**name**：Moduleの名前です。Recipeのnameプロパティに対応します。<br>**setModule**：Web Audio APIのAudioNodeを接続する関数です。<br>**option**：Web Audio APIのcreateOscillatorを使う場合には'VCO'をエンベロープ処理が必要な場合は'Env'を設定します。(省略可)|

#### setModule関数

setModule関数は以下の引数を持ちWeb Audio APIのAudioNodeの設定、接続を行う関数です。

| 引数 |説明|
|:------:|:------------|
|Manipulator|Manipulatorオブジェクトです。|
|currentRecipeNode|Recipeの中で現在参照しているJSONオブジェクトです。|
|destNode|接続先のAudioNodeです。|


最低限以下の処理が必要になります。
```js
var setModule = function(Manipulator, currentRecipeNode, destNode){

    //AudioNodeの作成
    var AudioNode = Manipulator.ctx.[AudioNodeを作成するWebAudioAPIの関数];
    //ModuleManagerにAudioNodeを登録
    Manipulator.moduleManager.registerAudioNode(currentRecipeNode, vco);

    //AudioNodeのパラメータを設定

    //destNodeに接続
    AudioNode.connect(destNode);
    currentRecipeNode['state'] = true;
}
```

オシレータの例を以下に示します。

```js
var setVCO = function(Manipulator, currentRecipeNode, destNode){
    var vco = Manipulator.ctx.createOscillator();

    //ModuleManagerにAudioNodeを登録
    Manipulator.moduleManager.registerAudioNode(currentRecipeNode, vco);

    //パラメータを取得
    var param = currentRecipeNode['param'];
    var octave = 1;

    //オシレータの周波数に関する設定
    //frequencyがcvの時は外部入力の周波数を設定
    if (param['frequency'] == 'cv'){
        if(param['octave'] != undefined){
            octave =param['octave'];
        }
        vco.frequency.value = Manipulator.freq * octave;
        Manipulator.cvList.push(vco);
    //frequencyにレシピノードが設定されていればそのレシピノードをfrequencyにつなぐ
    }else if(param['frequency']['name'] != undefined){
        var paramNode = param['frequency'];
        Manipulator.setManipulator(paramNode, vco.frequency);

    //それ以外は数値とみなして代入
    }else{
        vco.frequency.value = param['frequency'];
    }
    //オシレータのデチューンを設定
    //detuneにレシピノードが設定されていればそのレシピノードをdetuneにつなぐ
    if(param['detune'] != undefined){
        if(param['detune']['name'] != undefined){
            var paramNode = param['detune'];
            Manipulator.setManipulator(paramNode, vco.detune);

        //それ以外は数値とみなして代入
        }else{
            vco.detune = param['detune'];
        }
    }
    //オシレータのタイプを設定
    vco.type = param['type'];

    //VCOノードの設定が終わったのでdestNodeに接続
    vco.connect(destNode);
    currentRecipeNode['state'] = true;
}
```
