// 获取元素
let imgBox = document.querySelector('.img-box')
let imgs = document.querySelectorAll('img')
let dots = document.querySelector('.dots')
let dotsLis = dots.querySelectorAll('li')
let leftArrow = document.querySelector('.left-arrow')
let rightArrow = document.querySelector('.right-arrow')

let index = 1 // 记录当前图片索引
let timer = null // 定时器

dotsLis[0].className = 'active' // 初始第一个圆点激活

// 切换下一张图片
function nextImg() {
  if (index >= 4) { // 当第4张图片切换到下一张跳板图片1时
    index = 5
    imgBox.style.transition = 'all, linear, 1.5s' // 先正常过渡到跳板图片上
    imgBox.style.transform = `translateX(${-index * 400}px)`
    // 实现无缝切换
    setTimeout(function() { // 正常过渡完成后，瞬间切换到第1张图片（无过渡效果）
      index = 1
      imgBox.style.transition = '' // 无过渡效果
      imgBox.style.transform = `translateX(${-index * 400}px)`
    }, 1500)
  } else { // 当图片索引在 [1, 3] 之间时，正常过渡
    index++
    imgBox.style.transition = 'all, linear, 1.5s'
    imgBox.style.transform = `translateX(${-index * 400}px)`
  }
  // 更新激活圆点的索引
  for (let i = 0; i < 4; i++) {
    dotsLis[i].className = ''
  }
  dotsLis[(index - 1) % 4].className = 'active'
}

// 切换上一张图片
function prevImg() {
  if (index <= 1) { // 当第1张图片切换到上一张跳板图片4时
    index = 0
    imgBox.style.transition = 'all, linear, 1.5s' // 先正常过渡到跳板图片上
    imgBox.style.transform = `translateX(${-index * 400}px)`
    // 实现无缝切换
    setTimeout(function() { // 正常过渡完成后，瞬间切换到第4张图片（无过渡效果）
      index = 4
      imgBox.style.transition = '' // 无过渡效果
      imgBox.style.transform = `translateX(${-index * 400}px)`
    }, 1500)
  } else { // 当图片索引在 [2, 4] 之间时，正常过渡
    index--
    imgBox.style.transition = 'all, linear, 1.5s'
    imgBox.style.transform = `translateX(${-index * 400}px)`
  }
  // 更新激活圆点的索引
  for (let i = 0; i < 4; i++) {
    dotsLis[i].className = ''
  }
  if (index === 0) {
    dotsLis[3].className = 'active'
  } else {
    dotsLis[index - 1].className = 'active'
  }
}

rightArrow.addEventListener('click', nextImg) // 点击右箭头，切换下一张图片
leftArrow.addEventListener('click', prevImg) // 点击左箭头，切换上一张图片
timer = setInterval(nextImg, 3000) // 每隔 3s，自动切换下一张图片

// 当鼠标移到图片、左箭头、右箭头上时，清除定时器，停止轮播
imgBox.addEventListener('mouseover', () => { clearInterval(timer) })
leftArrow.addEventListener('mouseover', () => { clearInterval(timer) })
rightArrow.addEventListener('mouseover', () => { clearInterval(timer) })

// 当鼠标移开后，继续轮播
imgBox.addEventListener('mouseout', () => { timer = setInterval(nextImg, 3000) })
leftArrow.addEventListener('mouseout', () => { timer = setInterval(nextImg, 3000) })
rightArrow.addEventListener('mouseout', () => { timer = setInterval(nextImg, 3000) })