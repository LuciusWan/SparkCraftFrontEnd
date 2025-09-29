import request from '@/utils/request'

/**
 * 创建图片生成应用
 * @param {Object} data - 创建应用数据
 * @param {string} data.projectName - 应用名称
 * @param {string} data.projectDesc - 应用初始描述，作为初始 Prompt
 * @returns {Promise} 返回新创建的应用ID
 */// 创建图像项目
export const createImageProject = (data) => {
  return request({
    url: '/imageProject/add',
    method: 'post',
    data
  })
}

// AI 聊天接口
export const chatWithAI = (data) => {
  return request({
    url: '/imageProject/chat/get/idea',
    method: 'post',
    data
  })
}

// AI 聊天流式接口
export const createAIChatStream = (params, onMessage, onEnd, onError) => {
  const { imageProjectId, message } = params
  
  // 构建完整的URL
  const baseURL = request.defaults.baseURL || '/api'
  let fullUrl
  
  if (baseURL.startsWith('http')) {
    // 生产环境：完整的URL
    fullUrl = new URL('/imageProject/chat/get/idea', baseURL)
  } else {
    // 开发环境：相对路径，使用当前域名
    fullUrl = new URL(`${baseURL}/imageProject/chat/get/idea`, window.location.origin)
  }
  
  fullUrl.searchParams.append('imageProjectId', imageProjectId)
  fullUrl.searchParams.append('message', message)
  
  const eventSource = new EventSource(fullUrl.toString(), {
    withCredentials: true
  })
  
  // 监听消息事件
  eventSource.onmessage = function(event) {
    try {
      // 检查是否是结束标志
      if (event.data === 'end' || event.data === '[DONE]') {
        console.log('收到结束信号:', event.data)
        if (onEnd) {
          onEnd()
        }
        eventSource.close()
        return
      }
      
      // 解析正常的消息数据
      const data = JSON.parse(event.data)
      const content = data.d
      if (onMessage) {
        onMessage(content)
      }
    } catch (error) {
      console.error('解析消息数据失败:', error, '原始数据:', event.data)
      if (onError) {
        onError(error)
      }
    }
  }
  
  // 监听结束事件
  eventSource.addEventListener('end', function(event) {
    console.log('AI对话结束:', event.data)
    if (onEnd) {
      onEnd()
    }
    eventSource.close()
  })
  
  // 监听错误事件
  eventSource.onerror = function(error) {
    console.error('EventSource 发生错误:', error)
    if (onError) {
      onError(error)
    }
    eventSource.close()
  }
  
  return eventSource
}

// 执行工作流
export const executeWorkflow = (data) => {
  return request({
    url: '/imageProject/workflow/execute',
    method: 'post',
    data,
    timeout: 300000 // 5分钟超时，适应长时间的工作流处理
  })
}