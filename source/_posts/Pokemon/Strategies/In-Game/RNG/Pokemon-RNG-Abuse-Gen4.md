---
title: 宝可梦四代实机乱数
author: willkyu
date: 2022-01-14 10:01:15
categories:
  - Pokemon
tags:
  - Pokemon
  - Pokemon-RNG-Abuse
  - Pokemon-Gen4
---

这是宝可梦四代的实机乱数教程.
包含 ID 与 Egg 的乱数教程.
如有纰漏，请[与我联系](/about/)，万分感谢！

<!-- more -->

**注意，本教程仅支持宝可梦四代正作游戏：**

Version |珍珠|钻石|白金|心金|魂银|其他
:-----:|:------:|:------:|:------:|:------:|:------:|:------:
Support |✔|✔|✔|✔|✔|✘

前人栽树，后人乘凉.
本篇对转载原文:[【转载】四代乱数教程及工具](https://tieba.baidu.com/p/6552613197?pid=130747309042&cid=0#130747309042)稍作修改，无法找到原作者，见谅.
如果你认识原作者，可以[与我联系](/about/)！

# 前言

1. 四代乱数的原理，机制. 还有各种乱数相关的知识，大多源自于外文网站[Smogon](https://www.smogon.com/ingame/rng/dpphgss_rng_intro)(虽然Smogon的一些资料也是翻译自日文资料). 没有多少是原作者原创的. 这篇教程更多是一篇翻译+整理，加上实际乱数的一些技巧. 感谢各位大大做的努力，造福广大口袋玩家.
2. 本教程采用傻瓜式渐进方式，从头开始一点一点的讲解四代乱数，希望能带来一些帮助.

# 准备工作

如果你想要乱数闪光宝可梦，你需要知道你的[SID](https://wiki.52poke.com/wiki/ID_No.#.E9.87.8CID_No.).

> 如果你想要乱数的是已经创建好的存档，这可能会需要你导出存档并使用 *PKHex* 等软件查看你的存档（不涉及修改与导入），请根据自身接受程度使用.<br>
> 不会导出存档？看看这篇博客：[如何备份你的存档](/Pokemon/Strategies/In-Game/How-To-Back-Up-Your-Savefiles/).

## 硬件准备

- 能够游玩第四世代宝可梦卡带的机器（*NDS* 或 *3DS* 系列）.
- 电脑.
- （若需要导出存档）*NDS*烧录卡与读卡器.

> 如果不准备使用烧录卡，可能需要准备足够的神奇糖果.

## 下载乱数所需工具

- 计时器[EonTimer](https://github.com/dylmeadows/EonTimer/releases)
  如果因为国内 GitHub 下载速度原因不好下载，可以点击[这里](/download/EonTimer.rar)进行下载.
- 乱数工具[RNGReporter](https://github.com/Admiral-Fish/RNGReporter/releases)
  如果因为国内 GitHub 下载速度原因不好下载，可以点击[这里](/download/RNGReporter.zip)进行下载.

## 了解四代乱数机制

说到乱数，就不得不提 **Seed**. 对数论和密码学没什么了解的玩家，对于 **Seed** 可以简单的这么理解.  **Seed** 是一个数值，在游戏开始的时候会确定下来. 然后游戏系统会根据 **Seed** 计算出一个长长长长的随机数序列，然后游戏内的随机事件，就会由这个数列里的随机数来决定如何发生.

> 举一个最简单的例子，某一次我进入游戏. 当前 **Seed** 生成的前三个随机数是 F011，F410，0112. 那么此时我按下 **A** 键与我面前的一只闪电鸟进入战斗(身上无同步率). 此时系统会根据第一个随机数来决定闪电鸟的性格. F011 / A3E = 17. 查表可以知道，17对应的是Quiet性格. 所以我进入战斗遇到的这只闪电鸟性格一定是Quiet.

既然 **Seed** 决定了游戏内的随机事件如何发生. 那么我们怎么来得到我们想要的 **Seed** 呢？

四代的 **Seed** 由两个因素决定.

1. 在游戏内，按下 **A** 键读档进入游戏这一刻的时间，年月日时分秒全部参与计算，也只精确到秒.
2. 从启动游戏这一刻，到按下 **A** 键读档进入游戏这一刻，所经过的时间. 这个时间的精度为 1/30 秒，即约0.033秒.

这是四代乱数最基础的两点知识，想要着手开始四代乱数的各位一定要牢记.
最后，本教程默认读者了解涉及的一些基础知识，例如何为[ID](https://wiki.52poke.com/wiki/ID_No.)， [SID](https://wiki.52poke.com/wiki/ID_No.#.E9.87.8CID_No.)， [PID](https://wiki.52poke.com/wiki/%E6%80%A7%E6%A0%BC%E5%80%BC)， [IV(个体值)](https://wiki.52poke.com/wiki/%E4%B8%AA%E4%BD%93%E5%80%BC).

# ID乱数

## 目的

通常大家追求ID，SID，是为了两个目的：

1. 获得自己喜欢的表ID.
2. 获得高个体的闪光宝可梦.
   因为四代乱数机制的关系，一只宝可梦如果IVs全部确定，那么这只宝可梦就只有少数几种可能的 PID. 例如最常说的6V神兽，就只有6种可能的PID(火钢除外)，如果不借助乱数，自然获得一个ID，SID进入游戏. 那么我们获得6V闪光神兽的概率，也就和BW异国孵蛋出闪光的概率一样(而且性格还不一定是自己想要的). 所以，为了心仪的闪光神兽，乱一个 ID，SID 开始游戏，也是有必要的.

## 确认目标

1. 打开 RNGReporter，选择 **Time Finder --> 4th Generation Time Finder**.
   ![Figure1](/images/body/Pokemon-RNG-Abuse-Gen4/Figure1.jpg)
2. 在这个界面，按图中所示的填入各项.
   year可以随便填. Min，Max Delay，Min，Max Frame如果不理解的话，都和图上一样的填好. 然后填上自己想要的个体，性格，特性，性别.
   点击 **Generate** .
   ![Figure2](/images/body/Pokemon-RNG-Abuse-Gen4/Figure2.png)

   > 另外，这里有一个成对的概念. 具体原理略不过不谈，只需要知道，对同一组个体值，同一组 ID，SID，有两个PID会同时对应闪光. 例如图上最后两行对应的Timid，Modest，就是成对的. 一组 ID，SID 只要能让其中一个闪光，就必定能闪另一个. 从图上观察，只要两个分布具有相同的 Frame，Hour，并且 PID 的末三位都相同，那它们就是成对闪光的.

3. 找到目标之后，就记下这对分布的任意一个PID. 这里我们以最后一对 TIMID，MODEST 为例，记下 PID: 7942EF72.
4. 在 RNGReporter 的主界面，选择 **4th Gen Tools** 中的 **TID\SID Manipulation ("Pandora's Box")**.
   ![Figure3](/images/body/Pokemon-RNG-Abuse-Gen4/Figure3.png)
5. 在红框所示的地方，填入刚才记下的PID，Minimum Delay填入5000(如果是乱Pt，建议填5300+)，勾上 *Infinite Serach*. 如果你想要一个自己满意的表ID，那么可以勾上 *Search for Trainer ID*，在*Desired Trainer*框中填入目标表ID（这样耗时会较久）.
   ![Figure4](/images/body/Pokemon-RNG-Abuse-Gen4/Figure4.png)
6. 点击*Find Compatible Seeds*按钮，就可以生成满足条件的ID，SID了. 因为会无限生成，所以在有一定数量的结果之后，请点Cancel. 之后从结果列表里挑一个自己满意的 ID，SID 作为目标，将目标ID对应的SEED复制下来. 这里以图上蓝色高亮的ID 20802，SID 51056为例.
   ![Figure5](/images/body/Pokemon-RNG-Abuse-Gen4/Figure5.png)
7. 在 RNGReporter 的主界面，选择 **4th Gen Tools** 中的 **Seed To Time**.
   ![Figure6](/images/body/Pokemon-RNG-Abuse-Gen4/Figure6.jpg)
8. 在SEED(HEX)框内填入刚才记下的seed，在Second内填入自己觉得方便的秒数. 这里以HgSs作例子，所以选择HgSs，其余设置和图上保持一致.
   ![Figure7](/images/body/Pokemon-RNG-Abuse-Gen4/Figure7.png)
9. 点击 **Generate**，在结果图里任选一组目标时间，作为我们实际操作的选择.

## 校准偏差与乱数ID

1. 使用 Eontimer 击中seed，这里请查看[如何使用Eontimer](#如何使用Eontimer计时器).
    - 如果是HgSs请在上图所示的界面等待计时器到0进入游戏.
      ![Figure8](/images/body/Pokemon-RNG-Abuse-Gen4/Figure8.png)
    - 如果是DPPt，请在上图所以的界面等待计时器到0时按 **A** 键.
      ![Figure9](/images/body/Pokemon-RNG-Abuse-Gen4/Figure9.png)
    操作细节请注意: 取名字的时候，每次都按相同的操作取名字，以免造成帧数不必要的变化.
2. 进入游戏之后，查看自己的表ID，这个ID多半不是我们的目标，此时需要确定偏差.
3. 将得到的表ID填入下图的红色框内，seed对应的月日年时分也依次填入. MinMax delay填入自己估计的偏差. 例如目标是4987，那Min Max可以分别填入4900 5100.
   ![Figure10](/images/body/Pokemon-RNG-Abuse-Gen4/Figure10.png)
4. 点击 **Find** 按钮，看到自己实际击中的delay. 如果没有结果. 可以将Min Max的范围扩大再搜索. 如果依然没有，请检查年月日时分秒和eontimer的设置是否正确.
5. 得到我们实际击中的delay之后，即可使用 Eontimer 调整偏差，继续尝试，直到得到目标ID.

# 如何使用Eontimer计时器

Eontimer是一个非常好用的计时器，功能涵盖三四五代，这里我们只需要用到四代的功能.

1. 打开软件，选择 4 选项卡. 除了红色框内的：如果是 HgSs，参数如图上所示就ok. 如果是PT，请将490改为600，其他不变. 这样就完成了初步设置.
   ![Figure11](/images/body/Pokemon-RNG-Abuse-Gen4/Figure11.png)
2. 我们从RNG的Seed To Time 工具里得到的时间是这样的.
   ![Figure12](/images/body/Pokemon-RNG-Abuse-Gen4/Figure12.png)
   想要击中对应的目标seed. 将对应的秒数填入红色框内 Target Second的位置(这里是47)，将对应的delay填入红色框内TargetDelay的位置(这里是4987).
   然后设置游戏机的时间到目标时间(这里是2013年4月23日，13点57分). 注意图上的 Minutes Before Target 后面红色的数字. 这代表需要提前设置的分钟数. 这里的分钟数为1，机器时间设置需要提前一分钟. 即为2013年4月23日，13点56分. 如果是0的话，就不需提前，按目标时间设置就好.
3. 设置好之后，同时在机器时间设置界面按下 **A**键，以及 Eontimer 的 **start**按钮. 这时Eontimer即会开始计时，在第一个计时到0的时候，在机器的主界面按 **A** 进入游戏（如果是 DSi 或者 3DS 系列，可以提前进入游戏后在归0时软重置，不然校准误差时需要多往后搜索一些）. 在第二个计时到0的时候，在读档确认界面（即选择存档进入游戏的界面）按下 **A** 键，进入游戏.
4. 进入游戏之后，我们可以通过各种方法来验证自己实际击中的delay. 将实际击中的delay填入Delay Hit 框内，然后点选Update，Eontimer会自动调整计时. 当然. 如果你击中的delay离目标delay已经很近（+-6之内），那么基本不需要Update，保持一致的操作，反复尝试即可.
5. 如果击中的delay和我们的目标delay奇偶不同，那么在Seed To Time工具内，改一下种子的年份(+-1)，用新生成的种子作为目标就可以了. 如果是在乱ID的时候，也可以不改年份，在取名界面多改变一次大小写. （据说对于DS系统，插入GBA卡带也可以改变奇偶，有待测试）

大部分时候Eontimer的使用都如上面描述，不过还是有几个特别的地方：
在乱ID的时候，由于没有读档界面，在第二个计时器到0的时候，请在乱ID篇给出的界面按A. (友情提示，乱ID前记得删除存档)

另外是秒数的设置. 几乎所有的情况，和目标秒数保持一致就ok. 唯一的例外是**在HgSs(仅限HgSs)里乱ID的时候，Eontimer的秒数设置比目标秒数减3.例如目标秒数是47，eontimer里就填入44.**

# 宝可梦乱数

在前文讲seed的时候提到过，seed生成了一个长长长长的随机数序列. 但是，如何用这些随机数来生成我们实际得到的宝可梦的各项参数：例如个体，性格，特性，性别，是否闪光之类的；均是由method来决定的. 所以，即便是一串相同的随机数，在不同的method下得到的宝可梦是不同的(即便是同一编号的宝可梦). 最简单的例子就是绿宝石内定点的变隐龙和野生的变隐龙，即便在相同的随机数序列下，抓到的定点和野生的变隐龙也是不同的.
所以乱宝可梦，首先要知道它对应的Method.

## 确定乱数目标

***如果选择了野外相遇的宝可梦，请在队伍中准备一只习得了[甜甜香气](https://wiki.52poke.com/wiki/%E7%94%9C%E7%94%9C%E9%A6%99%E6%B0%94%EF%BC%88%E6%8B%9B%E5%BC%8F%EF%BC%89#.E5.8F.AF.E4.BB.A5.E5.AD.A6.E4.BC.9A.E8.AF.A5.E6.8B.9B.E5.BC.8F.E7.9A.84.E5.AE.9D.E5.8F.AF.E6.A2.A6)的宝可梦.***
确定乱数目标后，选择相应的 *Method*. 如果是乱数蛋，请点击[这里](#蛋乱数).

### *Method 1*

- 初始御三家，赠送的前代御三家
- 赠送的波可比的蛋，小卢卡的蛋
- 赠送的伊布，3D龙，巴尔郎，迷你龙
- 各类化石复活的宝可梦，游戏中心兑换的宝可梦
- 各类游走神兽：雷公，炎帝，水都，美梦，游走蘑菇，三鸟（水都和三鸟只有游走的才是 *Method1*）
- 阿尔宙斯祈祷剧情赠送的DPPt三神

点击下面的谜拟Q来查看英文描述：
<details>
    <summary><img no-lazy src="/images/mimikyu.png" alt="Method 1 请点击丘丘" align=left></summary>
    <br>
    DPP：<br>
    Starter Pokemon<br>
    Cynthia's Togepi Egg<br>
    Fossil Pokemon from Mining Museum<br>
    Riolu Egg from Riley<br>
    Eevee from Bebe<br>
    Porygon from Veilstone<br>
    Cresselia， Mesprit， Articuno， Zapdos， and Moltres<br><br>

    HgSs：<br>
    Kanto/Hoenn/Johto Starters<br>
    Togepi Egg<br>
    Bill's Eevee<br>
    Raikou， Entei， and Latios/Latias roamer; the Latios/Latias from the Enigma Stone event is NOT Method 1<br>
    Tyrogue from Mt. Mortar<br>
    ExtremeSpeed Dratini received from Dragon's Den<br>
    Goldenrod/Celadon Game Corner Prize Pokemon<br>
    Fossil Pokemon Pewter City Museum<br>
    Sinjoh Ruins Dragon event where you need Arceus<br><br>

    Note: Any Pokemon received from a trade or as a gift that has a fixed nickname and OT (Kenya the Spearow， Gaspar the Haunter， etc.) will have set IVs and nature so RNG manipulation techniques will never work on them.

  </details>
<br><br>

### *Method J/K*

Method J/K(DPPt对应 J，HgSs对应 K)的宝可梦可以被同步率、魅惑身躯影响（之后的选项中需要更改 **Requied Lead** 项）. 而游戏中几乎所有的野生怪兽、定点神兽都对应Method J/K. （愤怒湖的红色暴鲤龙是Chained Shiny Method，不要尝试用Method K去乱它）

如果乱数野生宝可梦，你还需要选择 *Encounter Slot* 项，点击顶部菜单项 **4th Gen Tools** 选择对应游戏版本的 *Encounter Table*，来查看你想要的宝可梦属于什么 *Encounter Slot*.（可能需要科学上网）

### *Wondercard IVs*

- 在商店领取的Wondercards宝可梦
![WonderCards](/images/body/Pokemon-RNG-Abuse-Gen4/WonderCards.png)

对于 DPPt，您需要保存在 Pastoria City Mart，因为那里随机移动的 NPC 数量最少. 对于 HgSs，请保存在 Fuchsia 或 Cerulean City's Mart 中，因为这两个位置都没有随机移动的 NPC.
在当前没有 NPC 移动时进行保存也很重要.
此外，在 DPPt 中乱数时，请确保在进入游戏的那一刻调出菜单，以防止 NPC 移动.
与其他方法不同的是，无法在不作弊的情况下保证获得确定的性格，多尝试几次吧.

## 乱数宝可梦

1. 打开 RNGReporter，选择 **Time Finder --> 4th Generation Time Finder**.
2. Year Min Max Delay Min Max Frame如果仍然不理解，请按图上的填入. 个体性格按自己需要的填写.
   ![Figure13](/images/body/Pokemon-RNG-Abuse-Gen4/Figure13.png)
3. 点击 Generate，得到目标 Seed，我们选择帧数较小的一个.
4. 用seed To time 工具得到种子对应的时间和delay，设置好 Eontimer. （如果有游走宝可梦可以打开map来方便确定delay）
5. 将游戏进行到所需位置存档.
6. 用Eontimer计时器辅助进入游戏之后，[判断实际击中的delay](#初始帧与判断delay).
7. 找到实际delay之后，调整eontimer的设置，反复尝试，直到击中目标delay.
8. 击中目标delay之后，[推进至目标帧](#增加帧数).
9. 触发，得到宝可梦.

> 需要注意的一点是，在野外乱数时，很可能受到随机NPC的干扰，这里就需要乱数的各位自行调整偏差. 可以根据第一次击中帧数的偏移帧来调整，也可以通过打电话看回复的方法来调整，这里就留给大家去尝试吧. 这里能给大家的一点经验就是，在同一个地方不同的时间存档，帧数的偏移很可能会不一样，因为存档的同时也记录下了NPC的位置，所以调整帧数之后不要重新存档.

> 最后，几乎所有的Method1 宝可梦起始帧数都为1. 例外主要是同时判定多只宝可梦的情况. 比如燃烧塔同时判定雷公炎帝(1、6，欧版反之)，白金和大木博士对话同时判定关东三鸟. 三鸟先后顺序是火焰鸟、闪电鸟、急冻鸟，帧数分别为1、6、11. 比较好的方法是，先乱其中一只鸟，把目标的那只捕获后，打死另外两只，再和博士对话. 这样剩下的两只释放时，先后关系依然如上，帧数分别对应1、6. 不建议在和宝石钢天王对话时乱游走水都，因为那地方NPC多，帧数难以控制，所以游走水都还是很使用打联盟的方法乱吧.

## 初始帧与判断delay

### HgSs

#### 通过打电话来确认帧

在某些情况下，我们只有使用打电话的方法来确认delay.

1. 在35号路获得杂耍艺人 麦克的电话：
   ![Irwin1](/images/body/Pokemon-RNG-Abuse-Gen4/Irwin1.jpg)
   ![Irwin2](/images/body/Pokemon-RNG-Abuse-Gen4/Irwin2.png)
   Irwin可能的回复有三种：
   ![E](/images/body/Pokemon-RNG-Abuse-Gen4/E.png)
   ![K](/images/body/Pokemon-RNG-Abuse-Gen4/K.png)
   ![P](/images/body/Pokemon-RNG-Abuse-Gen4/P.png)
   分别记为 **E**，**K**，**P**.

2. 进入游戏之后，快速转到打电话页面，给Irwin打电话，记录下每次打电话的结果. 注意，每打一个电话会增加1帧，如我打了8个电话，回复序列是P P K P P K E E，则前进了8帧.
3. 在 seed to time 界面. 选中目标时间和delay. 点击界面下半部的generate.
   ![Figure14](/images/body/Pokemon-RNG-Abuse-Gen4/Figure14.png)
4. 可以看到，结果列表里出现了目标delay附近的delay对应的电话序列. 用刚才得到的电话序列去列表中对照，如果完全吻合，即可基本确认，我们实际击中的delay是多少. 刚才我们的8个电话的回复对应的是delay 1061. 因为1061和目标奇偶不同，所以需要改一下年份，重复前面的过程. 具体参照eontimer的部分.

   > 如果距离目标delay差距较大，界面的Delay+-(图上是+-10)，例如改成+-50，结果列表里即会出现距离目标delay+-50范围类的结果. 继续查找就行.

5. 如果结果范围太大. 可以使用界面上的 SearchCalls 按钮.
   ![Figure15](/images/body/Pokemon-RNG-Abuse-Gen4/Figure15.jpg)
   将自己的电话回复填入，直到 PossibleResults 是1的时候，点击确认即可找到delay.

#### 通过游走神兽的位置来确认帧

在RNG的Seed To Time界面打开 Map 按钮. 可以看到，游戏内地图上每一个游走神兽可能出现的位置都用数字编号标出. 进入游戏之后查看游走神兽的位置，即可知道自己当前击中的seed.
![Map](/images/body/Pokemon-RNG-Abuse-Gen4/Map.png)
![Figure16](/images/body/Pokemon-RNG-Abuse-Gen4/Figure16.png)
在地图上存在游走神兽的时候(R雷公E炎帝L水都)，查找seed的时候需要勾上对应的选项. 然后在delay范围的列表里，可以看到每个seed(delay)对应的游走神兽分布.
进入游戏之后，快速打开地图. 查看游走神兽的位置，与给出的位置对照. 如果发现游走神兽的位置是 R 33 E 30 L 17，那么就基本可以确定击中了目标seed.
当然如果出现的位置是 R30 E 35 L18 那么基本就可以确定击中的delay是8487. 同样，如果delay的范围较大，可以使用searchroamers的功能来查找.

最后需要注意的是，地图上有游走神兽的时候，读档开始游戏时就会额外的消耗帧. 绝大部分情况下，都是1只消费一帧. 所以，地图上有N只游走神兽时，起始帧数即为N+1，乱数时候请牢记.

> 在极少数情况下，会出现某只游走神兽消费两帧的情况. 这个时候，即便击中了seed，游走神兽的位置也会和软件显示的位置不符合. 如果发现反复击中目标delay前后，但是老是击不中目标. 这时候可以用非目标的那个位置打电话验证一下. (我还没遇到过这种情况)

### DPPt

#### 使用口袋手表的硬币插件来确认帧

在选择DPPT的选项时，生成的结果列表里会有seed(delay)对应的抛硬币结果. 在Search Flips 选项卡里，可以看到 T H 的含义.
![Figure17](/images/body/Pokemon-RNG-Abuse-Gen4/Figure17.png)
![Figure18](/images/body/Pokemon-RNG-Abuse-Gen4/Figure18.jpg)
进入游戏之后，将抛硬币得到的结果输入，直到Possible Results变为1，确认之后就能找到结果了. 与HgSs的不同点在于，抛硬币不像打电话一样会增加帧数. 另外，在PT中，进入游戏时的日记会增加帧数(看一页增加2帧). 所以在PT里乱的时候，到目标处，存档读档再存档，去掉日记的干扰为最佳.

**白金的[抛硬币插件](https://wiki.52poke.com/wiki/%E5%AF%B6%E5%8F%AF%E9%8C%B6#.E6.8E.B7.E7.A1.AC.E5.B8.81)要拿到攀岩之后才能获得.**

> 注意，对于无法利用上述方法的场合，可以通过导出存档后查看个体并通过RNGReporter的工具**4th Gen Tools --> Find Seed by IVs**来反查seed/delay.
> 此外，也可以参考别人写的呆呆兽初始与迷人之躯教程中列表的方法，但会很耗时间. 相关文章可点击[这里](/download/GEN4-Slowpoke-RNG.rar)下载.

### 初始御三家的确认帧

在目标前存档并**备份**，领取后导出存档，根据[宝可梦火红叶绿实机乱数（不包含 ID 或 Egg）中【确定初始seed组并选择备用初始seed】章节的7~9步](/Pokemon/Strategies/In-Game/RNG/Pokemon-RNG-Abuse-Gen3-Part3/#确定初始seed组并选择备用初始seed)的方法进行反查得到初始seed。

> 注意，pt的初始会有游走npc消耗帧数，请尽快操作，并记下消耗帧。

## 增加帧数

HgSs里，已经讲过打电话的方法，每一个电话增加1帧. 但是这非常不方便. 还有一个HgSs和PT通用的更好的方法：聒噪鸟. 在给聒噪鸟录好音的情况下，查看一次聒噪鸟的状态增加1帧(不需要听到叫声). 身上准备好两只聒噪鸟，来回切换，即可快速方便的增加帧数.

另外就是HgSs的广播也能增加帧数. 比较有用的就是博士的口袋广播，听一次会增加14~18帧. 在目标帧数成百上千的时候比较有用. 我个人没有尝试过，具体请参见外网资料.

存档一次也可以增加一帧，可以适用于初始乱数。

# 蛋乱数

想要乱数蛋，首先还是要弄清蛋相关的乱数的机制. 在游戏里，每走255步就会判定是否出蛋，并且同时判定蛋的性格值，性格，特性，性别，是否闪光. 一旦确定，除非从老爷爷那里收掉或者拒绝掉这个蛋，否则不会更改；这里用来判定的PID，并非是前文所说的那些，而是用的一个叫做Egg PID的东西；Egg PID所用到的随机数是由我们所熟知的随机数序列的种子，经过另一个随机数算法得来的. 从老爷爷拿蛋的时候会根据当前的PID(这个PID即为我们在乱定点/游走/野生时候所说的PID)来决定

![Figure19](/images/body/Pokemon-RNG-Abuse-Gen4/Figure19.jpg)

1. 打开4th Gen Time Finder，进入Shiny Egg选项卡.
2. 按自己的需求选上对应的性格，特性，性别，是否闪光. 如果是异国婚姻，记得勾上左边的 International Parents. 都弄好之后generate.
3. 强烈建议选Frame为1的作为目标，这样我们可以省去增加Egg Pid的步骤.
4. 选中目标之后，将宝可梦存入，记下先存入的为Parent A，后存入的为Parent B. 不要带不变石or项圈什么的. 都弄好之后到屋外存档.
5. 之后的操作和前文乱数类似，将我们的目标Seed用seed to time工具换算成时间，用eontimer辅助进入击中seed.
6. 用游走神兽确认击中之后，在老爷爷面前来回跑动直到出蛋.
7. 出蛋之后在老爷爷面前存档，拿蛋，验证一下是否是我们的目标. 如果闪光，性格，特性，性别不正确，回到步骤5
   ![Figure20](/images/body/Pokemon-RNG-Abuse-Gen4/Figure20.jpg)
8. 用 EggIVs 选项卡，ParentA/B里分别填入对应的个体，右边选上自己的目标个体. 都填好之后generate.
9. 目标结果会非常多，随便选一个帧数在10以上的吧(因为需要电话确认帧位置，所以不建议选太小的). 蓝色高亮的是我们这次例子的目标. 右边还贴心的列出了直到目标前的电话回复. 这里是(E E E) K P E P P P K E P K. 注意如果地图上有三只游走神兽的话， EE E这三帧会被消耗掉. 再加上周围有NPC的原因，我们打的第一个电话可能是 K 也可能是 P E P. 所以多打几个电话，确认我们帧的位置，不过记住，打完最后的K之后，就可以退出菜单和老爷爷对话拿蛋了. 例如，我打的前三个电话是 P P P，那么我还需要打 K E P K 4个电话，就可以和老爷爷拿蛋了.

# 礼物特别篇----玛娜菲的蛋

从Ranger联动过来的玛娜菲的蛋不同于普通的礼物，是**method 1**生成的. 系统为了‘防止’玩家获得闪光的玛娜菲，在生成蛋的PID的时候，会用当前玩家的ID/SID判定是否闪光，如果闪光，就用下一个PID，直到不闪光为止. 然而，蛋里的宝可梦是否闪光，是孵出来的那一刻判定的，这就给了我们钻空子的机会.
假设我有A，B两张四代卡. 我在A卡里乱一只PID能和B的 ID/SID判定闪光的玛娜菲，传到B卡里孵化，那么就可以成功获得闪光的玛娜菲了！

具体的操作方法，就留一个小小的尾巴，让各位自行尝试吧. 不过有一点建议，因为通信会强制存档，所以乱闪光玛娜菲我们只有一次机会. 建议在HgSs里乱玛娜菲(**因为没有随机NPC**)，然后再传到其他卡带里孵化，如果对乱数熟练掌握的话，成功率几乎是100%.

# Reference

- [【转载】四代乱数教程及工具](https://tieba.baidu.com/p/6552613197?pid=130747309042&cid=0#130747309042)
- [Smogon RNG 教程](https://www.smogon.com/ingame/rng/)
