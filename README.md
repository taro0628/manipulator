# Manipulator

JSON形式で音色を指定できるWeb Audio APIのライブラリです。

##概要

JSON形式でオシレータやフィルタ、エフェクトなどのつなげ方を指定し、Web Audio APIで音を出すことが出来ます。

また、新しいフィルタやエフェクトを簡単に追加できるようになっています。

[デモページ](http://taro0628.github.io/manipulator/docs)

##特徴

- JSON形式で音色を指定できる
- Web Audio APIを知らなくても一般的なシンセサイザーの知識があれば使える
- Web Audio APIの知識があれば簡単に新しいフィルタやエフェクトを追加できる

##使い方

基本的な使い方の紹介です。
詳細な使い方は[リファレンス](reference.md)を参照してください。

1. src/manipulater.jsを読み込みます。

  ```html
  <script src="../src/manipulator.js" charset="utf-8"></script>
  ```

2. 音色を指定するJSONを用意します。

  ```js
  var tone1Recipe = {
    name: 'VCA',
    gain: 0.9,
    input: {
      name: 'Env',
      param:{
          gain: 1,
          attack: 0,
          decay: 0.1,
          sustain: 0.5,
          release: 0.1,
      },
      input: {
        name: 'VCF',
        param: {
          frequency: 400,
          type: 'bandpass',
          Q: 8,
          gain: 1
        },
        input: {
          name: 'VCO',
          param: {
            frequency: 'cv',
            type: 'triangle'
          }
        }
      }
    }
  };
  ```

3. Manipuratorオブジェクトを作成します。

  ```js
  var tone = new Manipulator(ctx, toneRecipe);
  ```

4. noteOnメソッドで音をならします。

  ```js
  //数字で音高を設定
  //12はド
  tone.noteOn(12);
  ```

##ライセンス
Copyright (c) 2016 Kotaro Makino
Released under the MIT license
[http://opensource.org/licenses/mit-license.php](http://opensource.org/licenses/mit-license.php)
