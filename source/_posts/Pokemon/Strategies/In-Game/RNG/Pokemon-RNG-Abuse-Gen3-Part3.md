---
title: 宝可梦火红叶绿实机乱数（不包含 ID 或 Egg）
author: willkyu
date: 2021-12-24 20:55:41
categories:
  - Pokemon
tags:
  - Pokemon
  - Pokemon-RNG-Abuse
  - Pokemon-Gen3
---
这是宝可梦火红叶绿的实机乱数教程.
不包含 ID 与 Egg 的乱数教程.
如有纰漏，请[与我联系](/about/)，万分感谢！

<!-- more -->

**注意，本教程仅支持：火红叶绿.**

如果你在找有电的红蓝宝石实机乱数教程，请点击[这里](/Pokemon/Strategies/In-Game/RNG/Pokemon-RNG-Abuse-Gen3-Part2/).
如果你在找绿宝石及没电红蓝宝石的红蓝宝石实机乱数教程，请点击[这里](/Pokemon/Strategies/In-Game/RNG/Pokemon-RNG-Abuse-Gen3-Part1/).

> 成果展示:
  ![Result](/images/body/Pokemon-RNG-Abuse-Gen3-Part3/Result.png)

# 准备工作
在开始之前，你要知道火叶乱数的难度很高，可能会花费你大几小时的时间. 请自行斟酌.

如果你想要乱数闪光宝可梦，你需要知道你的[SID](https://wiki.52poke.com/wiki/ID_No.#.E9.87.8CID_No.).

> 如果你想要乱数的是已经创建好的存档，这可能会需要你导出存档并使用 *PKHex* 等软件查看你的存档（不涉及修改与导入），请根据自身接受程度使用.（本教程默认读者使用*NDS*烧录卡进行存档提取来方便查看个体）

> 由于我没有怎么研究过乱数ID，所以如果你想要乱数ID，请参考：[Smogon ID 乱数教程](https://www.smogon.com/ingame/rng/rs_nonbredrng#idsid).<br>
> 之后如果自己研究了一遍就会上传Blog.

> 不会导出存档？看看这篇博客：[如何备份你的存档](/Pokemon/Strategies/In-Game/How-To-Back-Up-Your-Savefiles/).

## 硬件准备
- 能够游玩第三世代宝可梦卡带的*NDS*系列机器（初代 *NDS* 或 *NDS lite*，以下统称 *NDS*）.
- 电脑.
- *NDS*烧录卡与读卡器.

> 本教程默认读者使用*NDS*烧录卡进行存档提取来方便查看个体，如若抗拒，请参考 [宝可梦绿宝石及没有电的红蓝宝石实机乱数（不包含 ID 或 Egg）](/Pokemon/Strategies/In-Game/RNG/Pokemon-RNG-Abuse-Gen3-Part1/) 中提及的方法（使用神奇糖果）.

## 下载乱数所需工具：
- 计时器[EonTimer](https://github.com/dylmeadows/EonTimer/releases)
  如果因为国内 GitHub 下载速度原因不好下载，可以点击[这里](/download/EonTimer.rar)进行下载.
- 乱数工具[3genSearch](https://www.dropbox.com/sh/68qqg26op3uaymc/AAC8QFFKYxAqQjG80abgcHZ1a?dl=0)
  国内需要科学上网，因原作者禁止二次发布所以这里不提供直接下载，可以通过各搜索引擎找到别人的分享.
- 乱数工具[RNGReporter](https://github.com/Admiral-Fish/RNGReporter/releases)
  如果因为国内 GitHub 下载速度原因不好下载，可以点击[这里](/download/RNGReporter.zip)进行下载.
- 存档编辑软件[PKHex](https://github.com/kwsch/PKHeX/releases)
  将使用其查看宝可梦的个体，不会涉及到存档修改.
  如果因为国内 GitHub 下载速度原因不好下载，可以点击[这里](/download/PKHeX(190705).zip)进行下载（版本：19.07.05）.
- seed查找工具[FRLGSeedFinder](https://www.smogon.com/forums/threads/rng-manipulation-in-firered-leafgreen-wild-pok%C3%A9mon-supported-in-rng-reporter-9-93.62357/)
  如果选用3genSearch可以不用此工具. 也可以点击[这里](/download/FRLGSeedFinder.zip)进行下载.

> 两个乱数工具选择任意一个都可以，本教程使用的是 *RNGReporter*. 3genSearch的使用与之类似，还请读者自行探索.

## 了解乱数机制
请参考[宝可梦绿宝石及没有电的红蓝宝石实机乱数（不包含 ID 或 Egg）](/Pokemon/Strategies/In-Game/RNG/Pokemon-RNG-Abuse-Gen3-Part1/#了解乱数机制) 中的相应部分.
这里不同的是，火红叶绿（以下简称 ***FRLG***）的初始 seed 极难控制，它根据进入游戏到标题画面出现 *PRESS START* 的那段时间有三次按键判定，然后根据时间、按键等因素决定初始 seed 组，最后从中选择一个初始 seed（可能有些偏差，但大体上是这个意思）. 我们需要通过等待（不进行按键操作）至游戏自动到达 *PRESS START* 界面后再按键操作，这样会跳过前两次按键判定，使得我们更容易控制初始 seed. 此外，当你在 *PRESS START* 界面按下按键 **A** 或 **START** 后，不仅初始 seed 决定了，游戏也将开始推进帧数.

## 确定乱数目标
请参考[宝可梦绿宝石及没有电的红蓝宝石实机乱数（不包含 ID 或 Egg）](/Pokemon/Strategies/In-Game/RNG/Pokemon-RNG-Abuse-Gen3-Part1/#确定乱数目标) 中的相应部分.
这里我以 *Method 1* 的游戏厅宝可梦为例，甜甜香气等的 Method 没有测试，如果你测试了，还请[与我联系](/about/)，十分感谢.

# 开始乱数
## 确定初始seed组并选择备用初始seed
1. 打开 *EonTimer* ，点击红色框来选择第三世代，在蓝色框中填入游戏等待时间.
   （大于等于35000，1000每秒. 即如果填入37000，计时器会在第37秒归零. 不建议过长，游戏会自动重启.）
   其他部分不需要修改.
    ![Figure1](/images/body/Pokemon-RNG-Abuse-Gen3-Part3/Figure1.png)
2. 点击 ***Start*** 按钮的同时开始游戏(gba系列和设置过的nds是直接开机，未设置过的nds系列是在主页面点击GBA游戏图标).
3. 在倒计时归 0 的同时按下 **A** 或 **START** 键. （这时应该进入 游戏选择存档进入界面）
4. 进入游戏，任意获得一只宝可梦后存档并关机（越快越好），这里建议在游戏厅内兑换凯西.
5. 重复步骤2~4，重复的次数建议在30次左右.
6. 使用 NDS烧录卡 提取游戏存档后使用 PKHex 打开.
7.  选择一只你获得的宝可梦，右击选择 *查看* 并选择左侧选项卡的 *数值*.
    ![Figure2](/images/body/Pokemon-RNG-Abuse-Gen3-Part3/Figure2.png)
8.  打开乱数工具*RNGReport*，选择顶部 **4th Gen Tools** 菜单栏，选择第一项 *Calculate PID from IVs*.
9.  输入个体性格与你的ID，点击*Find*，选择**PID**对应的一栏.
    ![Figure3](/images/body/Pokemon-RNG-Abuse-Gen3-Part3/Figure3.png)
10. 将得到的seed输入工具*FRLGSeedFinder*中，得到初始seed（4位16进制数）.
    ![Figure4](/images/body/Pokemon-RNG-Abuse-Gen3-Part3/Figure4.png)
11. 将得到的seed记录下来.
12. 重复步骤7~11，直到获取所有你在步骤5中得到的宝可梦的初始seed.
13. 这样你就得到了步骤1中确定的游戏等待时间所对应的初始seed组.
14. 从中选择出现频率最高的几个初始seed作为备用初始 seed. （如果第n高与第n+1高的seed出现频率差别较大，那么就选择到第n个）

> 我在测试时记录的草稿，见[附录](#Appendix).

## 搜索目标宝可梦
回到乱数工具首页，选择/填入图中红框中内容：
![Figure5](/images/body/Pokemon-RNG-Abuse-Gen3-Part3/Figure5.png)

1. *Method* 选择之前确定的 *Method*.
2. 根据你想要的宝可梦个体、性格、性别等填入信息，如果想要闪光请填入你的 **ID** 与 **SID**，并勾选 *Shiny Only*.
   如果你使用甜甜香气，你还需要选择 *Encounter Slot* 项，点击顶部菜单项 **3th Gen Tools** 选择对应游戏版本的 *Encounter Table*，来查看你想要的宝可梦属于什么 *Encounter Slot*.（可能需要科学上网）
   你也可以借助 *3genSearch* 工具来查看.
3. 输入之前得到的初期 seed.
4. *Start Frame*为开始帧，*Max Results*为显示的结果数，即你的搜索范围是*Start Frame* ~ *Start Frame* + *Max Results*.（强烈建议选择两分钟以内的，即7200帧以内）
5. 点击*Generate*，得到结果.
6. 重复步骤1~5，将所有备用初始 seed 全部检索完后选择最合适的 seed 与 Frame 作为目标初始 seed 与目标帧.（这里以 seed: AAA2，Frame: 1499为例）
7. 注意，*RNGReporter*的起始Frame与*FRLGSeedFinder*不同，请-1后当作结果（即这里目标帧不是1499，而是1498）

    > 没有想要的宝可梦或者闪帧太靠后了怎么办？<br>
    > 回到 [确定初始seed组并选择备用初始seed](#确定初始seed组并选择备用初始seed)步骤，并在第一步选择一个不同的游戏等待时间（或者赌一下初始 seed 组中备用初始 seed 以外的 seed）.

8. 将目标帧填入 *EonTimer* 中的 **Target Frame** 栏.

## 校准误差
***如果你的目标宝可梦不是野外宝可梦（如定点宝可梦），那么要在步骤1结束后，将存档备份***

1. 在游戏中你应该存档的位置存档（如果你准备在洞穴或是能出现宝可梦的建筑中使用甜甜香气，请往深处走一些距离，否则甜甜香气可能会失效），存档完成后关机.
2. 点击计时器 ***Start*** 按钮的同时开始游戏(设置过的nds是直接开机，未设置过的nds系列是在主页面点击GBA游戏图标).
3. 在计时器的第一次倒计时归零的瞬间按下机器的 ***A*** 或 ***Start*** 键，然后快速到达目标帧的确定位置（如：在选择宝可梦使用甜甜香气的界面）.
4. 在计时器的第二次倒计时归零的瞬间按下机器的 ***A*** 键，然后等待进入战斗界面后捕捉这只宝可梦，保存并关闭游戏. （游戏厅等是直接获取）
5. 执行[确定初始seed组并选择备用初始seed](#确定初始seed组并选择备用初始seed)中的步骤6~10，你在得到的 seed 前还会得到该 seed 前的一串数字，那是你击中的帧数，记为 *击中帧*. （如果seed不是你的初始seed也没关系，这很正常，我们这一步只为了校准误差）
6.  回到计时器，计算*目标帧*减去*击中帧*的值，将其加上*目标帧*的值得到新的目标帧，将其替换计时器的 **Target Frame** 栏.

    > 例如 目标帧 是1498，击中帧是1398，1498 - 1398 = 100，那么将 Target Frame 中的值更新为 1498 + 100 = 1598.

误差校准完成.

> 注意，如果你更换了目标，即目标帧有较大变动或者宝可梦获得方式改变（如Method不同 或 由游戏厅切换为卡比兽），请重新进行误差校准！

## 乱数
***如果你的目标宝可梦不是野外宝可梦（如定点宝可梦），那么要先将备份存档恢复***
和校准误差的3、4步类似：
1. 在计时器的第一次倒计时归零的瞬间按下机器的 ***A*** 或 ***Start*** 键，然后快速到达目标帧的确定位置（如：在选择宝可梦使用甜甜香气的界面）.
2. 在计时器的第二次倒计时归零的瞬间按下机器的 ***A*** 键，然后等待进入战斗界面（游戏厅等是直接获取）.
3. 如果得到的不是*目标帧*，不要保存，关闭游戏重复步骤1~2.
4. 尝试较多次数仍失败的话，可以选择再次进行误差校准.

  > 因为手工操作的误差与火叶机制的特殊性，建议尝试大几十次，再考虑重新校准误差.

5. 乱数成功，得到目标！

# 写在后面
- 还有一种比较麻烦的方法，在这里描述一下，十分费时费力，就不展开说了：
  - 准备大量的神奇糖果.
  - 使用玩家自制的软件 [FR/LG RNG Timer](https://www.smogon.com/forums/threads/fr-lg-rng-timer.3554964/). 也可以点击[这里](/download/FRLG_RNG_Timer.jar)进行下载.
  - 进入游戏的同时开始计时器.
  - 捕捉一只宝可梦并通过糖果确定个体.
  - 使用个体查出初始seed.
  - 查找该seed下满意的宝可梦，将目标帧数输入 FR/LG RNG Timer 点击 Submit.
  - 游戏推进到等待生成帧.
  - 倒计时结束触发生成帧.
  - 捕捉并通过糖果确认个体.
  - 利用个体查找击中帧数，记录校准值.
  - 利用校准值再来一次.

***十分不建议使用这种方法，在FRLG中，经常出现跳过奇数帧或偶数帧的情况，触发条件暂时还未知（不操作不影响），所以这个方法极难成功.***

# Reference
- [Smogon RNG 教程](https://www.smogon.com/ingame/rng/)
- [RNG Manipulation in FireRed/LeafGreen: Wild Pokémon Supported in RNG Reporter 9.93](https://www.smogon.com/forums/threads/rng-manipulation-in-firered-leafgreen-wild-pok%C3%A9mon-supported-in-rng-reporter-9-93.62357/)
- [Programming - FR/LG RNG Timer](https://www.smogon.com/forums/threads/fr-lg-rng-timer.3554964/)

# Appendix
- Draft
  ![Draft](/images/body/Pokemon-RNG-Abuse-Gen3-Part3/Draft.png)
