// 実装機能
// - Header
// - 画像
// - リンク（URLを自動で見つけてリンク生成）
// - 太字、打ち消し線、斜体など
// - 水平線
// - 数式
// - 目次自動挿入
// - リスト（通常、数字付き、チェックボックス）
// - 引用
// - テーブル
// - pre記法（行内のものと```形式のもの）

// 実装機能
// - Header
// - 画像
// - リンク（URLを自動で見つけてリンク生成）
// - 太字、打ち消し線、斜体など
// - 水平線
// - 数式
// - 目次自動挿入
// - リスト（通常、数字付き、チェックボックス）
// - 引用
// - テーブル
// - pre記法（行内のものと```形式のもの）
function addTag(buf, tag, attr = []) {
  var attrText = "";
  attr.forEach(at => { attrText += " " + at[0] + "=" + at[1]; });
  return "<" + tag + attrText + ">" + buf + "</" + tag + ">";
}
function parse_inline(md: str) {
  let img_root_dir = "";
  let link_root_dir = "";
}
function getTag(md: str, lastTag) {
  const regix_header = new RegExp(/^[\#]{1,6} (.+)/gm);
  const regix_hr = new RegExp(/^\-{2,}/gm);
  const regix_table = new RegExp(/^\|(.+)\|/gm);
  const regix_list = new RegExp(/^ *(\-|\+|\*|([1-9]\.)) (.+)/gm);
  const regix_quote = new RegExp(/^\&gt; (.+)/gm);
  const regix_pre = new RegExp(/^\`\`\`(.*)/gm);
  const regix_pre_e = new RegExp(/^\`\`\`/gm);
  const regix_pre_s = new RegExp(/^[ ]{4}(.*)/gm);

  if (lastTag === "pre") {
    if (regix_pre_e.test(md)) { return "pre-end"; }
    else { return "pre"; }
  }

  if (regix_header.test(md)) { return "header"; }
  if (regix_table.test(md)) { return "table"; }
  if (regix_list.test(md)) { return "list"; }
  if (regix_quote.test(md)) { return "quote"; }
  if (regix_hr.test(md)) { return "hr"; }
  if (regix_pre.test(md)) { return "pre"; }
  if (regix_pre_s.test(md)) { return "pre-s"; }
  return "normal";
}

function parse_escapes(md) {
  let md2 = md;
  const escapes = [
    [/&/gm, "&amp;"],
    // [/\\\\/g, "&#92"],
    // [/\\\(/g, "&#40"],
    // [/\\\)/g, "&#41"],
    // [/\\\*/g, "&#42"],
    // [/\\\[/g, "&#91"],
    // [/\\\]/g, "&#93"],
    // [/\\_/g, "&#95"],
    // [/\\`/g, "&#96"],
    // [/\\~/g, "&#126"],
    [/>/gm, "&gt;"],
    [/</gm, "&lt;"],
  ];
  escapes.forEach(function(x) { md2 = md2.replace(x[0], x[1]) });
  return md2;
}

function parse_inner_tags(md: string) {
  let md2 = md;
  const inner_tags = [
    [/\*\*(.+?)\*\*/gm, "<strong>$1</strong>"],
    [/_{2}(.+?)_{2}/gm, "<strong>$1</strong>"],
    [/~(\*)\*(.+?)\*~(\*)/gm, "<em>$1</em>"],
    [/ _(.+?)_ /gm, "<em>$1</em>"],
    [/`(.+?)`/gm, "<code>$1</code>"],
    [/~~(.+?)~~/gm, "<del>$1</del>"],
    // [/(.+?)  \n/gm, "$1<br>\n"],
    [/\n\n/gm, "<br>\n"],
    //image
    [/!\[(.*?)\]\((.*?)\)/gm, (_all, _alt, _src) => {
      let src = _src;
      let alt = _alt;
      let size = null;
      if (src.indexOf('|') > 0) {
        src = _src.substr(0, _src.indexOf('|'))
        size = _src.substr(_src.indexOf("|"))
      }
      const extention = src.split(".").pop().toLowerCase();
      if (["mp4", "avi", "mov", "webm", "vob", "mkv", "mpeg2"].indexOf(extention) >= 0) {
        return ` <video class="video-js" style="max-width:600px;" data-setup={} controls playsinline><source src="${src}" type="video/${extention}"> </video> `;
      }

      if (["wav", "mp3", "ogg", "webm", "pcm", "aiff"].indexOf(extention) >= 0) {
        return ` <audio src="${src}" width="80%" onclick="this.paused ? this.play() : this.pause();">動画を再生するにはaudioタグをサポートしたブラウザが必要です：alt:${alt}, src:${src}</audio> `;
      }

      return `<img class=\"e-img\" alt=\"${alt}\" src=\"${src}\" width=400>`;
    }],
    // link
    [/\[(.*?)\]\((.*?)\)/gm, "<a href=\"$2\">$1</a>"],
    // native url
    // [/(\b(https?|ftp|file|http):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, "<a href=\"$1\" class=\"e-link\">$1</a>"],
  ];
  inner_tags.forEach(function(x) { md2 = md2.replace(x[0], x[1]) });
  return md2;
}


function list_parser(md) {
  let lines = md.split('\n');
  // if(lines[lines.length-1] == ""){lines = lines.pop();}
  lines = lines.filter(function(el) { return el != ""; });
  let line_number = lines.length;
  let curLine = 0;
  let output = "";
  let tag = "ul";
  if (new RegExp(/^\s*[1-9]\. +/).test(lines[0])) { tag = "ol"; }
  else if (new RegExp(/^\s*[-*+] +/).test(lines[0])) { tag = "ul"; }
  else { console.log("Error - undefinded list tag name!!"); tag = "ul"; }
  while (curLine <= line_number - 1) {
    if (lines[curLine].charAt(0) === " ") {
      let indentNum = (lines[curLine].match(/^\s*/)[0] || []).length;
      let child_list = "";
      while (curLine < line_number) {
        child_list += lines[curLine].slice(indentNum) + "\n";
        if ((curLine == line_number - 1) || (lines[curLine + 1].charAt(0) != " ")) { break; }
        curLine += 1;
      }
      output += list_parser(child_list);
    } else {
      output += addTag(lines[curLine].replace(/^(\-|\+|\*|([1-9]\.)) (.+)/gm, "$3"), "li");
    }
    curLine += 1;
  }
  return addTag(output, tag);
}


function table_parser(md) {
  let lines = md.split('\n');
  if (lines.length < 1) return md;

  let head = lines[0].split("|");
  head = head.slice(1, head.length - 1);
  let output = "";

  if (lines.length < 2) {
    head.forEach(el => { output += addTag(el, th); });
    return "<table><tr>" + output + "</tr></table>";
  }

  let aligns = [];
  let al_str = lines[1].split("|");
  al_str = al_str.slice(1, al_str.length - 1);
  let check_align = function(str) {
    const reg_l = new RegExp(/:-+/);
    const reg_r = new RegExp(/-+:/);
    const is_l = reg_l.test(str.trim());
    const is_r = reg_r.test(str.trim());

    if (is_l && !is_r) return "left";
    if (!is_l && is_r) return "right";
    return "center";
  };
  al_str.forEach(al => { aligns.push(check_align(al)); });

  output = "<table><thead><tr>";
  let i = 0;
  head.forEach(el => { output += addTag(el, "th", [["align", aligns[i]]]); i += 1; });
  output += "</tr></thead><tbody>";

  let l = 2;
  while (l < lines.length) {
    let str = lines[l].split("|");
    str = str.slice(1, str.length - 1);
    let oneLine = "";
    i = 0;
    str.forEach(el => { oneLine += addTag(el, "td", [["align", aligns[i]]]); i += 1; });
    output += addTag(oneLine, "tr");
    l += 1;
  }
  output += "</tbody></table>";
  return output;

  //   <table>
  //   <tr>
  //     <th>果物</th> <th>味</th>
  //   </tr>
  //   <tr>
  //     <td>いちご</td> <td>甘い</td>
  //   </tr>
  //   <tr>
  //     <td>レモン</td> <td>酸っぱい</td>
  //   </tr>
  // </table>
}


function parse_one(md) {
  // 要素ごとに分ける
  var lines = md.split('\n');
  var line_number = lines.length;
  var curLine = 0;
  var output = "";
  var curTag = getTag(lines[0], "normal"); // normal, list. quote, table, pre,
  var curTagText = lines[0] + "\n";
  let nextTag = "";
  while (curLine <= line_number + 5) {
    if (curLine === line_number - 1) {
      nextTag = "eof";
    } else {
      nextTag = getTag(lines[curLine + 1], curTag);
    }
    if (curTag != nextTag || nextTag === "header") {
      switch (curTag) {
        case "normal":
          output += addTag(curTagText, "p");
          break;
        case "list":
          // 再帰処理
          output += list_parser(curTagText);
          break;
        case "quote":
          //TODO 再帰処理
          const inner_text = curTagText.replace(/^\&gt; (.+)\n/gm, "$1\n");
          output += addTag(parse_one(inner_text), "blockquote");
          break;
        case "pre-s":
          output += addTag(curTagText.replace(/^[ ]{4}(.*)/gm, "$1"), "pre");
          break;
        case "pre":
          const ll = curTagText.indexOf('\n', 0);
          const language = curTagText.slice(3, ll);
          // output += "<pre><code class=" + language + ">" + curTagText.substr(ll+1) + "</code></pre>";
          output += "<pre><code>" + curTagText.substr(ll + 1) + "</code></pre>";
          break;
        case "pre-end":
          break;
        case "hr":
          output += "<hr>\n";
          break;
        case "header":
          var arr = curTagText.match(new RegExp("#", "g")) || ["", "", "", "", "", ""];
          output += addTag(curTagText.slice(arr.length + 1), "h" + arr.length);
          break;
        case "table":
          output += table_parser(curTagText);
          break;
        default:
          console.log("Error - undefined tag value : ", curTag);
          break;
      }
      curTag = nextTag;
      curTagText = "";
    }
    if (nextTag === "eof") {
      return output;
    }
    curLine += 1;
    curTagText += lines[curLine] + "\n";
  }
  // それぞれパース
  return output;
}
/*
Special Tokens in Page

- [:news{n=16}]
- [:child{}]
- [:toc{}]

*/
const RENDER_EMBED_TAG = "markdown"

const md2html = (md: string) => {
  let md2 = (md != undefined) ? md.replace(/\t/g, "  ") : "";
  md2 = parse_one(md2);
  md2 = md2.replace(/\[:embed\]\((.*)\)/mg, `<markdown>[:embed]($1)</markdown>`)
  md2 = md2.replace(/\[:(.*)\{(.*)\}\]/mg, `<markdown>[:$1{$2}]</markdown>`);
  md2 = parse_inner_tags(md2);
  return md2;
}

const RenderEmbed = (md) => {
  let md2 = md.replace(/\t/g, "  ")
  md2 = md2.replace(/<markdown>\[:embed\]\((.*)\)<\/markdown>/mg, function(all, url, _attr) {
    let _xhr = new XMLHttpRequest();
    console.log(all);
    const url_d = encodeURIComponent(url);
    console.log(url_d);
    _xhr.open("GET", "/api/component?query=link&type=embed&url=" + url_d, false);
    _xhr.send();
    return _xhr.responseText;
  })

  md2 = md2.replace(/<a href=\"(.+)\"><\/a>/mg, function(all, url, _attr) {
    let _xhr = new XMLHttpRequest();
    console.log(all);
    const url_d = encodeURIComponent(url);
    console.log(url_d);
    _xhr.open("GET", "/api/component?query=link&type=embed&url=" + url_d, false);
    _xhr.send();
    return _xhr.responseText;
  })

  md2 = md2.replace(/<markdown>\[:(.*)\{.*\}\]<\/markdown>/mg, (all, query, _attr) => {
    console.log(all, query, (all.slice(all.indexOf("{"), -1)))
    let attr = all.split("{")[1].split("}")[0];
    console.log(attr)
    let attr_dict = []
    const vars = attr.split('&amp;');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      attr_dict[encodeURIComponent(pair[0])] = encodeURIComponent(pair[1]);
    }

    console.log(attr_dict);

    let _xhr = new XMLHttpRequest();
    switch (query) {
      case "toc":
        {
          if (md2.indexOf("<markdown>[:notoc{}]</markdon>") >= 0) {
            return createToc();
          } else {
            return ""
          }
        }
      case "child":
        {
          const params = { query: "child", dir: encodeURIComponent(document.location.pathname.replace("/view/", "")) };
          for (i in attr_dict) { params[i] = attr_dict[i] }

          _xhr.open('POST', "/api/component", false);
          _xhr.setRequestHeader('Content-Type', 'application/json');
          _xhr.send(JSON.stringify(params));
          return _xhr.responseText;
        }
      case "news":
        {
          const params = { query: "child", sort: "update_r", format: "tile", n: 10 };
          for (i in attr_dict) { params[i] = attr_dict[i] }
          _xhr.open('POST', "/api/component", false);
          _xhr.setRequestHeader('Content-Type', 'application/json');
          _xhr.send(JSON.stringify(params));
          return _xhr.responseText;
        }
      case "search":
        return `
          <div class="h_search"><form action = "/search" class="search-form" method = “get”>
              <input type="text" class="searchTerm" name="q" placeholder="What are you looking for?">
              <input type="submit" class="searchButton" value="&#xf002">
          </form></div>`

      case "notoc":
        return ""

      default:
        _xhr.open('GET', "/api/component?query=" + query + "&attr=" + attr, false);
        _xhr.send();
        return _xhr.responseText;
    }
  })

  return md2;
}

export default md2html;
