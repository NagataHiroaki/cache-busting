# はじめに

- Node.jsはv10以降を使用してください。（async/awaitが動作しないと思います）
- パラメーターにはUNIXタイムスタンプを使用します。
- 実行に必要なファイルはcache-busting.jsのみです。
- このプログラムはphpやSSIによるインクルードファイルでの利用を更新を想定しています。
- このプログラムの目的は、**該当ファイルのパラメーターの更新**です。タグの生成は行わないため、outputに指定するファイルは以下のようにタグ込みで記述してください。

```
link(rel="stylesheet" href="./dist/common/css/app.css")
script(src="./dist/common/js/ie.js")
script(src="./dist/common/js/vendor.js" defer)
script(src="./dist/common/js/bundle.js" defer)
```

# 使い方

## cache-busting.jsの設定

**output**

出力先のファイルを定義します。

**watchList**

監視するファイルを定義します。

## 実行

```
// 通常
$ node cache-busting.js (option)

//「ExperimentalWarning」を表示したくない場合
$ node --no-warnings cache-busting.js (option)
```

### オプション

**build** 

- 1度だけ実行します。
- 定義された全ファイルのパラメーターを更新します。

**watch**

- ファイルの変更を監視します。
- 変更のあったファイルのみパラメーターを更新します。
