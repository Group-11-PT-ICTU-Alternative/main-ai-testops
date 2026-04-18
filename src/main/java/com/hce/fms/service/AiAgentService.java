package com.hce.fms.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Service
@RequiredArgsConstructor
@Slf4j
public class AiAgentService {
    
    private static final String SYSTEM_PROMPT_FILE = "prompts/system_prompt_v1.md";
    private String systemPrompt;
    
    /**
     * Load system prompt from resources
     */
    private String loadSystemPrompt() {
        try {
            ClassPathResource resource = new ClassPathResource(SYSTEM_PROMPT_FILE);
            byte[] fileData = FileCopyUtils.copyToByteArray(resource.getInputStream());
            return new String(fileData, StandardCharsets.UTF_8);
        } catch (IOException e) {
            log.error("Failed to load system prompt from file: {}", SYSTEM_PROMPT_FILE, e);
            return getDefaultSystemPrompt();
        }
    }
    
    /**
     * Get system prompt (lazy loading) - used by AI methods
     */
    public String getSystemPrompt() {
        if (systemPrompt == null) {
            systemPrompt = loadSystemPrompt();
        }
        return systemPrompt;
    }
    
    /**
     * Main method to interact with AI agent
     * 
     * @param userMessage The user's message/question
     * @return AI agent response
     */
    public String askAgent(String userMessage) {
        log.info("Processing user message: {}", userMessage);
        
        try {
            // TODO: Integrate with actual AI service (OpenAI, Gemini, etc.)
            // For now, return a formatted response based on system prompt
            
            String response = generateMockResponse(userMessage);
            
            log.info("Generated AI response: {}", response);
            return response;
            
        } catch (Exception e) {
            log.error("Error processing AI agent request", e);
            return "Xin lỗi, tôi đang gặp sự cố kỹ thuật. Vui lòng thử lại sau hoặc liên hệ bộ phận hỗ trợ.";
        }
    }
    
    /**
     * Generate mock response based on system prompt
     * TODO: Replace with actual AI service integration
     */
    private String generateMockResponse(String userMessage) {
        String lowerMessage = userMessage.toLowerCase();
        
        if (lowerMessage.contains("qr") || lowerMessage.contains("mã qr")) {
            return "Để tạo mã QR thanh toán học phí:\n" +
                   "1. Đăng nhập vào hệ thống HCE-FMS\n" +
                   "2. Chọn mục 'Thanh toán học phí'\n" +
                   "3. Chọn học kỳ và khoản phí cần thanh toán\n" +
                   "4. Nhấn 'Tạo mã QR'\n" +
                   "5. ⚠️ **QUAN TRỌNG**: Mã QR sẽ hết hạn sau 15 phút\n" +
                   "6. Sử dụng ứng dụng ngân hàng để quét mã và thanh toán\n" +
                   "7. Thanh toán sẽ được xác nhận trong 2-5 phút\n\n" +
                   "Nếu gặp vấn đề, vui lòng liên hệ hỗ trợ kỹ thuật.";
        }
        
        if (lowerMessage.contains("thanh toán") || lowerMessage.contains("payment")) {
            return "Hệ thống HCE-FMS hỗ trợ các phương thức thanh toán sau:\n" +
                   "• Thanh toán QR Code (nhanh nhất)\n" +
                   "• Chuyển khoản ngân hàng\n" +
                   "• Thanh toán tại quầy\n\n" +
                   "Lưu ý: Mã QR có hiệu lực 15 phút kể từ khi tạo. " +
                   "Vui lòng hoàn tất thanh toán trước khi mã hết hạn.";
        }
        
        return "Chào bạn, tôi là trợ lý AI của hệ thống HCE-FMS. " +
               "Tôi có thể giúp bạn hướng dẫn thanh toán học phí, kiểm tra trạng thái thanh toán, " +
               "và giải đáp các thắc mắc liên quan. Bạn cần hỗ trợ gì ạ?";
    }
    
    /**
     * Fallback system prompt if file loading fails
     */
    private String getDefaultSystemPrompt() {
        return "You are an AI assistant for HCE-FMS tuition payment system. " +
               "Guide students through payment process, remind about 15-minute QR expiration, " +
               "and provide professional support.";
    }
}
