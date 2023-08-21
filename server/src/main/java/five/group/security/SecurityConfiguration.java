package five.group.server.security;

import five.group.server.auth.*;
import five.group.server.auth.jwt.JwtAuthenticationFilter;
import five.group.server.auth.jwt.JwtTokenizer;
import five.group.server.auth.jwt.JwtVerificationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class SecurityConfiguration {
    private final JwtTokenizer jwtTokenizer;
    private final MemberAuthority memberAuthority;

    public SecurityConfiguration(JwtTokenizer jwtTokenizer, MemberAuthority memberAuthority) {
        this.jwtTokenizer = jwtTokenizer;
        this.memberAuthority = memberAuthority;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .cors(Customizer.withDefaults())
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                .accessDeniedHandler(new MemberDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests().anyRequest().permitAll();
//                .authorizeHttpRequests(authorize -> authorize
//                        .antMatchers(HttpMethod.GET,"/members").hasRole("USER")
//                        .antMatchers(HttpMethod.PATCH,"/members").hasRole("USER")
//                        .antMatchers(HttpMethod.DELETE,"/members").hasRole("USER")
//                        .antMatchers(HttpMethod.POST,"/questions").hasRole("USER")
//                        .antMatchers(HttpMethod.PATCH,"/questions/*").hasRole("USER")
//                        .antMatchers(HttpMethod.DELETE,"/questions/*").hasRole("USER")
//                        .antMatchers(HttpMethod.POST,"/answers/*").hasRole("USER")
//                        .antMatchers(HttpMethod.PATCH,"/answers/*").hasRole("USER")
//                        .antMatchers(HttpMethod.DELETE,"/answers/*").hasRole("USER")
//                        .antMatchers(HttpMethod.POST,"/comments/*").hasRole("USER")
//                        .antMatchers(HttpMethod.PATCH,"/comments/*").hasRole("USER")
//                        .antMatchers(HttpMethod.DELETE,"/comments/*").hasRole("USER")
//                        .anyRequest().permitAll()
//        );


        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() { // CORS 필터 처리
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:8080","http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET","PATCH","DELETE","POST","OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setExposedHeaders(Arrays.asList("Authorization", "Refresh"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer,memberAuthority);

            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }
}
