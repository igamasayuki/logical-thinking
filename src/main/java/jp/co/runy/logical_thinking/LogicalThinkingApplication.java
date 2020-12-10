package jp.co.runy.logical_thinking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class LogicalThinkingApplication extends SpringBootServletInitializer {

	/**
	 * メインメソッド.
	 * 
	 * @param args
	 */
	public static void main(String[] args) {
		SpringApplication.run(LogicalThinkingApplication.class, args);
	}

	/**
	 * 個別のTomcatに配置させた時はこちらが呼ばれてアプリケーション起動します.
	 */
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(LogicalThinkingApplication.class);
	}
}
